// Visitor Tracking Utility

const API_BASE = '/api';

// Prevent duplicate tracking within 10 seconds
const DUPLICATE_WINDOW_MS = 10000;
let lastTrackedKey = '';
let lastTrackedTime = 0;

/**
 * Track a visitor when they land on the page
 * @param {string} guestName - Name from the personalized URL
 */
export async function trackVisitor(guestName) {
  const guestKey = guestName || 'Direct Visit';
  const now = Date.now();
  
  // Prevent duplicate tracking (React StrictMode calls useEffect twice)
  if (guestKey === lastTrackedKey && (now - lastTrackedTime) < DUPLICATE_WINDOW_MS) {
    console.log('📊 Skipping duplicate track for:', guestKey);
    return { success: true, skipped: true, reason: 'duplicate' };
  }
  
  lastTrackedKey = guestKey;
  lastTrackedTime = now;

  const trackingData = {
    guestName: guestKey,
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent,
    referrer: document.referrer || 'Direct',
    screenWidth: window.screen.width,
    screenHeight: window.screen.height,
    language: navigator.language
  };

  try {
    const response = await fetch(`${API_BASE}/track`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(trackingData)
    });

    const result = await response.json();
    
    if (result.success) {
      console.log('📊 Visit tracked:', result.data?.guestName, '| Stored in:', result.stored);
    }
    
    return result;
  } catch (error) {
    // Silent fail - don't break the wedding site if tracking fails
    console.log('📊 Tracking note:', error.message);
    return { success: false, error: error.message };
  }
}

/**
 * Get all visitors (admin only)
 * @param {string} password - Admin password
 */
export async function getVisitors(password) {
  try {
    const response = await fetch(`${API_BASE}/visitors`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${password}`,
        'Content-Type': 'application/json',
      }
    });

    return await response.json();
  } catch (error) {
    console.error('Error fetching visitors:', error);
    return { success: false, error: error.message, visitors: [] };
  }
}

/**
 * Clear all visitors (admin only)
 * @param {string} password - Admin password
 */
export async function clearVisitors(password) {
  try {
    const response = await fetch(`${API_BASE}/visitors`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${password}`,
        'Content-Type': 'application/json',
      }
    });

    return await response.json();
  } catch (error) {
    console.error('Error clearing visitors:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Format guest name from URL slug
 * @param {string} slug - URL slug like "john-smith"
 * @returns {string} - Formatted name like "John Smith"
 */
export function formatGuestName(slug) {
  if (!slug) return null;
  
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

/**
 * Create a URL slug from a name
 * @param {string} name - Name like "John Smith"
 * @returns {string} - Slug like "john-smith"
 */
export function createGuestSlug(name) {
  return name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}
