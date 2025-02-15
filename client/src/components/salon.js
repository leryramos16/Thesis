import React from "react"
import "./salon.css"
import "./salonbody.css"
import LogoProfile from "./images/celeblogo.png";
import FbLogo from "./images/fb.png";
import TiktokLogo from "./images/tiktok.png";
import IgLogo from "./images/ig.png";
import ModelPicture from "./images/model.jpg";


function Salon() {
  return (
    <div>
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
        
    </div>

    <div className="bio">
        With our skilled and experienced hairstylist you are sure to come out a star!
    </div>

    <div className="social-bar">
        <button><a href="https://web.facebook.com/celebstyles.hairsalon" target="_blank"/> <img src={FbLogo}/></button>
        <button><a href="https://www.tiktok.com/@celebritystyleshairsalon" target="_blank"/><img src={TiktokLogo}/></button>
        <button><a href="https://www.instagram.com/celebrity.styles.hair.salon/" target="_blank"/> <img src={IgLogo}/></button> 
    </div>

    <div className="model-container">
        <img class="model-pic" src={ModelPicture}/>
        
        <div className="message"><span class="letter-s">S</span>tart your dreams with Celebrity Styles Hair Salon
            <a href="http://127.0.0.1:5500/capstone/booking.html"><button>Book an Apointment</button></a>
        </div>
        
    </div>

    <div className="follow-link">
        <a href="https://www.tiktok.com/@celebritystyleshairsalon"><button class="follow-message">FOLLOW US ON TIKTOK</button></a>
        <a href="https://www.tiktok.com/@celebritystyleshairsalon"><button class="tiktok-user">@celebritystyleshairsalon</button></a>
    </div>
    </div>

    
  );
}

export default Salon;