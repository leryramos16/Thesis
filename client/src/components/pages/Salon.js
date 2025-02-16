import React from "react"
import "./salon.css"
import "./salonbody.css"

const Salon = () => {
  return (
    <div>
      <div className="header">
        <div class="logo-container">
            <img className="logo" src={require('../images/celeblogo.png')}/>
        </div>
        <div className="navigation-bar">
            <a href={window.apihost + "home"}> <button>HOME</button></a>
            <a href={window.apihost + "promos"}><button>PROMOS</button></a>
            <a href={window.apihost + "services"}><button>SERVICES</button></a>
            <button>HAIR TREND</button>
            <button>CONTACT</button>
        </div>
        
    </div>

    <div className="bio">
        With our skilled and experienced hairstylist you are sure to come out a star!
    </div>

    <div className="social-bar">
        <button><a  target="_blank"/> <img src={require('../images/fb.png')}/></button>
        <button><a  target="_blank"/><img src={require('../images/tiktok.png')}/></button>
        <button><a target="_blank"/> <img src={require('../images/ig.png')}/></button> 
    </div>

    <div className="model-container">
        <img class="model-pic" src={require('../images/model.jpg')}/>
        
        <div className="message"><span class="letter-s">S</span>tart your dreams with Celebrity Styles Hair Salon
        <a href={window.apihost + "booking"}><button>Book an Apointment</button></a>
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