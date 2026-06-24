/* eslint-disable react-refresh/only-export-components */
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

function CaseStudyStub() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-bg-deep text-beige-100 font-display text-3xl">
      <p>Case Study Detail (Stub)</p>
      <Link to="/" className="text-accent-gold text-lg mt-4 font-mono underline hover:text-beige-100" data-cursor="link">
        Back Home
      </Link>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/work/:id" element={<CaseStudyStub />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
