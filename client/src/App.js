import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Salon from "./components/pages/Salon"
import Home from "./components/pages/Home"
import Promos from "./components/pages/Promos"
import Services from "./components/pages/Services"
import Booking from "./components/pages/Booking"



function App() {
  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route index path="/" element={<Salon />} />
            <Route path="/home" element={<Home />} />
            <Route path="/promos" element={<Promos />} />
            <Route path="/services" element={<Services />} />
            <Route path="/booking" element={<Booking />} />
          </Routes>
        </BrowserRouter>

      </div>
    </>




  );
}

export default App;
