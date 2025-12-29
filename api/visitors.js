// Vercel Serverless Function - Get all visitors (Admin endpoint)

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    try {
      // Simple admin password check (set in Vercel environment variables)
      const adminPassword = req.headers.authorization;
      const expectedPassword = process.env.ADMIN_PASSWORD || '22022026';
      
      if (adminPassword !== `Bearer ${expectedPassword}`) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      // Try to get from Vercel KV if environment variables are set
      if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
        try {
          const { kv } = await import('@vercel/kv');
          const visitors = await kv.get('wedding_visitors') || [];
          
          return res.status(200).json({ 
            success: true, 
            source: 'kv',
            count: visitors.length,
            visitors: visitors.reverse() // Most recent first
          });
        } catch (kvError) {
          console.log('KV not available:', kvError.message);
        }
      }

      // If no KV, return message to check Vercel logs
      return res.status(200).json({ 
        success: true, 
        source: 'logs',
        message: 'Visitor data is stored in Vercel runtime logs. Go to your Vercel dashboard > Project > Logs to view visitors.',
        visitors: []
      });

    } catch (error) {
      console.error('Error fetching visitors:', error);
      return res.status(500).json({ success: false, error: error.message });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
