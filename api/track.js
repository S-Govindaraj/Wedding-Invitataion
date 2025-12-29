// Vercel Serverless Function - Track visitor
// This logs visitor data to Vercel logs (viewable in Vercel dashboard)

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    try {
      const { guestName, timestamp, userAgent, referrer } = req.body;
      
      // Get IP and location info from Vercel headers
      const ip = req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || 'unknown';
      const country = req.headers['x-vercel-ip-country'] || 'Unknown';
      const city = req.headers['x-vercel-ip-city'] || 'Unknown';
      const region = req.headers['x-vercel-ip-country-region'] || 'Unknown';

      // Parse device info from user agent
      const isMobile = /Mobile|Android|iPhone|iPad/i.test(userAgent);
      const deviceType = isMobile ? 'Mobile' : 'Desktop';
      
      // Create visitor record
      const visitorData = {
        id: Date.now().toString(),
        guestName: guestName || 'Direct Visit',
        timestamp: timestamp || new Date().toISOString(),
        ip: ip.split(',')[0].trim(),
        location: {
          city: decodeURIComponent(city),
          region: decodeURIComponent(region),
          country
        },
        deviceType,
        userAgent: userAgent || 'Unknown',
        referrer: referrer || 'Direct'
      };

      // Log to Vercel runtime logs (visible in Vercel Dashboard > Logs)
      console.log('========== WEDDING VISITOR ==========');
      console.log(`Guest: ${visitorData.guestName}`);
      console.log(`Time: ${visitorData.timestamp}`);
      console.log(`Location: ${visitorData.location.city}, ${visitorData.location.country}`);
      console.log(`Device: ${visitorData.deviceType}`);
      console.log(`IP: ${visitorData.ip}`);
      console.log('======================================');

      // Try to use Vercel KV if environment variables are set
      if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
        try {
          // Dynamic import - only loads if KV is available
          const { kv } = await import('@vercel/kv');
          
          let visitors = await kv.get('wedding_visitors') || [];
          visitors.push(visitorData);
          
          // Keep only last 1000 visitors
          if (visitors.length > 1000) {
            visitors = visitors.slice(-1000);
          }
          
          await kv.set('wedding_visitors', visitors);
          
          return res.status(200).json({ success: true, stored: 'kv', data: visitorData });
        } catch (kvError) {
          console.log('KV not available, using logs only:', kvError.message);
        }
      }

      return res.status(200).json({ 
        success: true, 
        stored: 'logs', 
        message: 'Visitor logged to Vercel runtime logs',
        data: visitorData 
      });

    } catch (error) {
      console.error('Tracking error:', error);
      return res.status(500).json({ success: false, error: error.message });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
