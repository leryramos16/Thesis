import React from "react"
import "./salon.css"


function Salon() {
  return (
    <div>
      <div class="header">
        <div class="logo-container">
            <img class="logo" src="/pictures/celeblogo.png"/>
        </div>
        <div class="navigation-bar">
            <a href="http://127.0.0.1:5500/capstone/salon.html"> <button>HOME</button></a>
            <a href="http://127.0.0.1:5500/capstone/promo.html"><button>PROMOS</button></a>
            <a href="http://127.0.0.1:5500/capstone/service.html"><button>SERVICES</button></a>
            <button>HAIR TREND</button>
            <button>CONTACT</button>
        </div>
        
    </div>

    <div class="bio">
        With our skilled and experienced hairstylist you are sure to come out a star!
    </div>

    <div class="social-bar">
        <a href="https://web.facebook.com/celebstyles.hairsalon" target="_blank"/> <img src="/pictures/fb.png"/>
        <a href="https://www.tiktok.com/@celebritystyleshairsalon" target="_blank"/><img src="/pictures/tiktok.png"/>
        <a href="https://www.instagram.com/celebrity.styles.hair.salon/" target="_blank"/> <img src="/pictures/ig.png"/>
    </div>

    <div class="model-container">
        <img class="model-pic" src="/pictures/model.jpg"/>
        
        <div class="message"><span class="letter-s">S</span>tart your dreams with Celebrity Styles Hair Salon
            <a href="http://127.0.0.1:5500/capstone/booking.html"><button>Book an Apointment</button></a>
        </div>
        
    </div>

    <div class="follow-link">
        <a href="https://www.tiktok.com/@celebritystyleshairsalon"><button class="follow-message">FOLLOW US ON TIKTOK</button></a>
        <a href="https://www.tiktok.com/@celebritystyleshairsalon"><button class="tiktok-user">@celebritystyleshairsalon</button></a>
    </div>
    </div>
  );
}

export default Salon;