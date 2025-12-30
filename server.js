// Local JSON File Server for Visitor Tracking
// Run this alongside Vite dev server: npm run server

import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;
const VISITORS_FILE = path.join(__dirname, 'visitors.json');

// Middleware
app.use(cors());
app.use(express.json());

// Initialize visitors file if it doesn't exist
function initVisitorsFile() {
  if (!fs.existsSync(VISITORS_FILE)) {
    fs.writeFileSync(VISITORS_FILE, JSON.stringify([], null, 2));
    console.log('📁 Created visitors.json');
  }
}

// Read visitors from file
function readVisitors() {
  try {
    const data = fs.readFileSync(VISITORS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading visitors:', error);
    return [];
  }
}

// Write visitors to file
function writeVisitors(visitors) {
  try {
    fs.writeFileSync(VISITORS_FILE, JSON.stringify(visitors, null, 2));
    return true;
  } catch (error) {
    console.error('Error writing visitors:', error);
    return false;
  }
}

// Track visitor endpoint
app.post('/api/track', (req, res) => {
  try {
    const { guestName, timestamp, userAgent, referrer } = req.body;
    
    // Get IP (will be localhost in dev)
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'localhost';
    
    // Parse device info
    const isMobile = /Mobile|Android|iPhone|iPad/i.test(userAgent || '');
    const deviceType = isMobile ? 'Mobile' : 'Desktop';
    
    // Create visitor record
    const visitorData = {
      id: Date.now().toString(),
      guestName: guestName || 'Direct Visit',
      timestamp: timestamp || new Date().toISOString(),
      ip: ip,
      location: {
        city: 'Local',
        region: 'Dev',
        country: 'Local'
      },
      deviceType,
      userAgent: userAgent || 'Unknown',
      referrer: referrer || 'Direct'
    };

    // Read existing visitors
    const visitors = readVisitors();
    
    // Add new visitor at the beginning
    visitors.unshift(visitorData);
    
    // Keep only last 500 visitors
    const trimmedVisitors = visitors.slice(0, 500);
    
    // Save to file
    if (writeVisitors(trimmedVisitors)) {
      console.log(`✅ Trackeda: ${visitorData.guestName} at ${new Date(visitorData.timestamp).toLocaleString()}`);
      res.json({ success: true, stored: 'json-file', data: visitorData });
    } else {
      res.status(500).json({ success: false, error: 'Failed to save visitor' });
    }

  } catch (error) {
    console.error('Tracking error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});


// Get visitors endpoint (admin)
app.get('/api/visitors', (req, res) => {
  try {
    // Simple password check
    const authHeader = req.headers.authorization;
    const expectedPassword = process.env.ADMIN_PASSWORD || '22022026';
    
    if (authHeader !== `Bearer ${expectedPassword}`) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const visitors = readVisitors();
    
    res.json({
      success: true,
      source: 'json-file',
      count: visitors.length,
      visitors: visitors
    });

  } catch (error) {
    console.error('Error fetching visitors:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Clear visitors endpoint (admin)
app.delete('/api/visitors', (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const expectedPassword = process.env.ADMIN_PASSWORD || '22022026';
    
    if (authHeader !== `Bearer ${expectedPassword}`) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    writeVisitors([]);
    console.log('🗑️ Cleared all visitors');
    
    res.json({ success: true, message: 'All visitors cleared' });

  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Start server
initVisitorsFile();
app.listen(PORT, () => {
  console.log('');
  console.log('🎊 Wedding Visitor Tracking Server');
  console.log('==================================');
  console.log(`📡 Server running at: http://localhost:${PORT}`);
  console.log(`📁 Visitors saved to: ${VISITORS_FILE}`);
  console.log('');
  console.log('Endpoints:');
  console.log(`  POST http://localhost:${PORT}/api/track    - Track a visitor`);
  console.log(`  GET  http://localhost:${PORT}/api/visitors - Get all visitors (needs auth)`);
  console.log('');
});
