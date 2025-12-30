import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Main wedding invitation */}
        <Route path="/" element={<App />} />
        
        {/* Personalized invite links */}
        <Route path="/invite/:guestSlug" element={<App />} />
        
        {/* Admin dashboard to view visitors */}
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
