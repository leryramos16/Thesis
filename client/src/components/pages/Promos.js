import React from 'react'
import "./promo.css"

const Promos = () => {
  return (
      <div>
          <div className="header">
              <div class="logo-container">
                <img className="logo" src={require('../images/celeblogo.png')}/>
              </div>
        <div className="navigation-bar">
            <a href={window.apihost + "home"}> <button className="home-button">HOME</button></a>
            <a href={window.apihost + "promos"}><button className="promos-button">PROMOS</button></a>
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
         <div class="promo-list">
            <img src={require('../images/promo.jpg')}/>
            <img src={require('../images/promo2.jpg')}/>
            
        </div>

        </div>
  




  );
}

  export default Promos;