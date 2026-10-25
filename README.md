# 💍 Royal 3D Digital Wedding Invitation & QR Landing Page

A luxurious, interactive digital wedding invitation web application built with **React**, **Three.js**, and **Framer Motion**. Designed for physical QR-code cards and modern WhatsApp invitations with **personalized guest links**, **animated confetti greetings**, and **real-time visitor tracking analytics**.

---

## 🌟 Key Features

### 🌸 1. Interactive 3D Ambient Background
- **Procedural 3D Floral System**: Floating procedural lotus/rose flower meshes extruded and rendered in real-time via `@react-three/fiber` and `@react-three/drei`.
- **Cosmic Starfield & Particles**: Gentle floating particles, ambient starfield, and warm bokeh illumination.
- **Hardware-Accelerated 60 FPS**: Smooth performance across both mobile browsers and desktop displays.

### 🎉 2. Personalized Guest Experience
- **Dynamic Guest Slugs**: Share custom links for each guest family (e.g. `yourwedding.com/invite/suresh-kumar`).
- **Celebratory Welcome Popup**: Automatically reads the URL slug and greets the guest with their formatted name (`"Welcome Suresh Kumar!"`) alongside an animated burst of heart, star, and circle confetti.
- **Bilingual Blessing**: Culturally rich Tamil welcome message (*அன்பான வரவேற்பு*) with seamless English translation.

### 📊 3. Live Visitor Tracking & Analytics
- **Automated Visit Logging**: Tracks when a guest opens the invitation, device type (Mobile/Desktop), screen resolution, IP, location, and timestamp.
- **Debounced Tracking**: Built-in duplicate prevention within a 10-second window to prevent double-counting.

### 🔐 4. Admin Management Dashboard (`/admin`)
- **Password-Protected Portal**: Secure access to all visitor logs (default password: `22022026`).
- **Interactive Link Generator**: Enter any guest's name to instantly create their custom `/invite/:slug` URL with a 1-click **Copy to Clipboard** button.
- **Filterable Visitor Logs**: View real-time visitor lists, device breakdown, and recent attendance intent.

### 📍 5. 1-Click Navigation & Route Guidance
- **Google Maps Integration**: Direct button opening exact GPS coordinates for the venue (*Lakshmi Narayana Marriage Hall*).
- **Public Transit & Bus Guide**: Step-by-step route directions and stopping points for out-of-town guests.

### 💬 6. Instant WhatsApp RSVP & Direct Calling
- **Pre-filled WhatsApp Chat**: 1-click WhatsApp messaging button for direct RSVP confirmations.
- **Direct Phone Dialing**: One-tap phone call link to reach the wedding coordinator.

---

## 🎨 Color Palette & Aesthetic

| Element | Color Code | Preview |
| :--- | :--- | :--- |
| **Imperial Gold** | `#c9a86c` | Primary accents, buttons, and borders |
| **Deep Charcoal/Gold Text** | `#2c2416` / `#8b6f3a` | High-contrast luxury typography |
| **Warm Cream** | `#faf8f5` | Clean, elegant background tone |
| **Rose Accent** | `#d4a5a5` | Romantic secondary highlights |
| **Sage Accent** | `#9caf88` | Festive greenery touches |

---

## 📁 Project Architecture

```
Wedding-Invitation/
├── api/                           # Vercel Serverless Functions (Production API)
│   ├── track.js                   # Handles POST /api/track with IP & Geolocation
│   └── visitors.js                # Handles GET/DELETE /api/visitors (Admin auth)
├── public/                        # Static assets & couple photos
│   ├── wedding.jpg                # Couple portrait
│   └── IMG-*.jpg                  # High-res ceremony imagery
├── src/
│   ├── components/
│   │   ├── FloatingBackground.jsx # Three.js 3D Canvas, Flowers, and Starfield
│   │   ├── FloatingBackground.css # 3D container styling & gradient mesh
│   │   ├── WelcomePopup.jsx       # Personalized Confetti & Guest Welcome Modal
│   │   └── WelcomePopup.css       # Confetti animations & popup styling
│   ├── pages/
│   │   ├── AdminDashboard.jsx     # Password-protected visitor dashboard & link generator
│   │   └── AdminDashboard.css     # Glassmorphic admin UI styling
│   ├── utils/
│   │   └── tracking.js            # Frontend visitor tracking client & slug parser
│   ├── App.jsx                    # Main single-page wedding invitation layout
│   ├── App.css                    # Luxury typography, cards, and responsive CSS
│   ├── index.css                  # Global resets & font imports
│   └── main.jsx                   # React Router route configuration
├── server.js                      # Local Node.js Express server for development tracking
├── visitors.json                  # Local development visitor storage database
├── vercel.json                    # Vercel routing rewrites & CORS headers
├── vite.config.js                 # Vite build configuration
└── package.json                   # Dependencies & build scripts
```

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- Node.js (v18.0 or higher recommended)
- npm or yarn

### 2. Installation
```bash
# Clone the repository or navigate to folder
cd Wedding-Invitataion

# Install frontend and backend dependencies
npm install
```

### 3. Running Locally
You can run the Vite frontend and the visitor tracking backend:

```bash
# Terminal 1: Start the Vite frontend dev server (port 5173)
npm run dev

# Terminal 2: Start the local tracking backend (port 3001)
npm run server
```

Open your browser:
- **Wedding Invitation**: [http://localhost:5173](http://localhost:5173)
- **Personalized Guest Demo**: [http://localhost:5173/invite/suresh-kumar](http://localhost:5173/invite/suresh-kumar)
- **Admin Dashboard**: [http://localhost:5173/admin](http://localhost:5173/admin) *(Password: `22022026`)*

---

## ✏️ Customization Guide

### 1. Wedding Details (`src/App.jsx`)
Update the `weddingDetails` object with your couple's information:

```javascript
const weddingDetails = {
  groomName: "Govindaraj",
  brideName: "Sathya",
  groomFull: "S. Govindaraj, B.E",
  groomJob: "Software Developer at Galent AI, Chennai",
  brideFull: "S. Sathya, B.Sc. B.Ed",
  brideJob: "Teacher, Chennai",
  date: "February 22, 2026",
  day: "Sunday",
  venue: "Lakshmi Narayana Marriage Hall",
  address: "Indira Nagar, Srivilliputtur, Tamil Nadu",
  mapLink: "https://maps.google.com/?q=Lakshmi+Narayana+Marriage+Hall+Indira+Nagar+Srivilliputtur",
  contact: "7339525771",
  contactName: "Soma Sundaram",
  directions: "From Srivilliputtur Bus Stand, take buses going to Watrap...",
  events: [
    { name: "Engagement Ceremony", time: "6:00 PM - 7:30 PM", date: "Saturday, 21st February 2026", icon: "💍" },
    { name: "Wedding Ceremony", time: "7:45 AM - 9:00 AM", date: "Sunday, 22nd February 2026", icon: "🪔" },
    { name: "Bride's Welcome Ceremony", time: "After 2:00 PM", date: "Monday, 23rd February 2026", icon: "🏠" }
  ]
};
```

### 2. Admin Password
To change the admin password:
- **Local Dev**: Edit `expectedPassword` in `server.js` or set `ADMIN_PASSWORD=your_password`.
- **Production (Vercel)**: Set the Environment Variable `ADMIN_PASSWORD` in your Vercel Project Settings.

---

## 🌐 Production Deployment (Vercel)

1. Push your repository to GitHub / GitLab.
2. Import the project into [Vercel](https://vercel.com).
3. The included `vercel.json` automatically handles:
   - Client-side routing for `/invite/:guestSlug` and `/admin`.
   - Serverless API execution for `/api/track` and `/api/visitors`.
4. *(Optional)* Add **Vercel KV** (`KV_REST_API_URL` & `KV_REST_API_TOKEN`) for persistent cloud visitor storage, or view logs directly in Vercel Runtime Logs.

---

## 📱 Creating and Sharing QR Codes

1. Deploy the site to your production domain (e.g., `https://govind-weds-sathya.vercel.app`).
2. Go to `/admin` to generate unique personalized URLs for VIP guests.
3. Use any free QR generator (e.g., [qr-code-generator.com](https://www.qr-code-generator.com)) to generate a high-resolution QR code pointing to your wedding URL.
4. Print the QR code onto your physical wedding invitation cards or send the link directly over WhatsApp!

---

## 📄 License & Credits

Built with ❤️ by **Govindaraj** for unforgettable wedding celebrations. Open for personal and commercial adaptation.
