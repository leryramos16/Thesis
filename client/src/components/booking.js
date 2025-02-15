import Salon from "./salon"

export default function Booking() {
    return (
        <div className="header">
        <div class="logo-container">
            <img className="logo" src={LogoProfile}/>
        </div>
        <div className="navigation-bar">
            <a href="http://127.0.0.1:5500/capstone/salon.html"> <button>HOME</button></a>
            <a href="http://127.0.0.1:5500/capstone/promo.html"><button>PROMOS</button></a>
            <a href="http://127.0.0.1:5500/capstone/service.html"><button>SERVICES</button></a>
            <button>HAIR TREND</button>
            <button>CONTACT</button>
        </div>

    <div className="social-bar">
        <button><a href="https://web.facebook.com/celebstyles.hairsalon" target="_blank"/> <img src={FbLogo}/></button>
        <button><a href="https://www.tiktok.com/@celebritystyleshairsalon" target="_blank"/><img src={TiktokLogo}/></button>
        <button><a href="https://www.instagram.com/celebrity.styles.hair.salon/" target="_blank"/> <img src={IgLogo}/></button> 
    </div>

    <div className="booking-container">
        <img class="booking-pic" src="/pictures/booking.png">
    </div>

    <div class="book-now">
        <div class="book-now-label">Book Now</div>
    <div class="note">No appointment needed for Haircut Customers. Just walk into our salon anytime during our operating<br> hours for a fabulous haircut experience.</div>
    <div class="first-layer">
    <input class="full-name" type="text" placeholder="Full Name">
    <input class="mobile-number" type="text" placeholder="Mobile number">
    </div>
        <div class="second-layer">
            <input class="hair-stylist" type="text" placeholder="Hair Stylist">
            <input class="service" type="text" placeholder="Service">
        </div>
        <div class="third-layer">
            <div class="reservation-time">Reservation time</div>
        </div>
        <div class="fourth-layer">
            <button>10AM</button>
            <button>11AM</button>
            <button>12NN</button>
            <button>01PM</button>
            <button>02PM</button>
            <button>03PM</button>
            <button>04PM</button>
            <button>05PM</button>
            <button>06PM</button>
        </div>
<div class="Reserve-layer">
<button class="reserve-button">RESERVE</button> 
</div>

</div>
    )
}

