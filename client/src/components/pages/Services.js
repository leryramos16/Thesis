import React from "react"
import "./service.css"

const Services = () => {
    return (
      <>        
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

          <div className="social-bar">
              <button><a  target="_blank"/> <img src={require('../images/fb.png')}/></button>
              <button><a  target="_blank"/><img src={require('../images/tiktok.png')}/></button>
              <button><a target="_blank"/> <img src={require('../images/ig.png')}/></button> 
         </div>

         <div class="service">
            <img src={require('../images/service.png')}/>
        </div>

        <div class="price-list">
            <img class="price-list-picture" src={require('../images/pricelist.jpg')}/>
            <img src={require('../images/manicure.jpg')}/>
        </div>
      </>
  
  
  
  
    );
  }
  
  export default Services;