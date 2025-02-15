import Salon from "./components/salon"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home"
import Promos from "./pages/Promos"
import Services from "./pages/Services"
import Booking from "./pages/Booking"



function App() {
  return (
    <>
     <div>
      <Salon/>
    </div>

    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={Home} />
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
