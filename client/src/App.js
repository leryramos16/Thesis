import ReactDOM from 'react-dom'
import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"

//Pages
import Salon from "./components/pages/Salon"
import Promos from "./components/pages/Promos"
import Services from "./components/pages/Services"
import Booking from "./components/pages/Booking"
import Contact from "./components/pages/Contact"
import ReservationDetails from "./components/pages/ReservationDetails"

//Admin Page
import Main from "./components/adminPage/Main"


function App() {
  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route index path="/" element={<Salon />} />
            <Route index path="/CSHS/admin-panel" element={<Main />} />
            <Route path="/home" element={<Salon />} />
            <Route path="/promos" element={<Promos />} />
            <Route path="/services" element={<Services />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/reservationdetails" element={<ReservationDetails />} />
          </Routes>
        </BrowserRouter>

      </div>
    </>




  );
}

export default App;
