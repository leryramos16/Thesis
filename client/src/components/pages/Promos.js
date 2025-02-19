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
            <button>CONTACT</button>
        </div>
        
        </div>

          <div className="social-bar">
            <a href="https://web.facebook.com/celebstyles.hairsalon"><img src={require('../images/fb.png')}/></a>
            <a href="https://www.tiktok.com/@celebritystyleshairsalon"><img src={require('../images/tiktok.png')}/></a>
         </div>
         <div class="promo-list">
            <img src={require('../images/promo.jpg')}/>
            <img src={require('../images/promo2.jpg')}/>
            
        </div>

        <div className="promo-footer">
          <img className="logo-footer" src={require('../images/celeblogo.png')}/> 
          <p className="about-salon"> 
            About Celebrity Styles Hair Salon
          </p>
          <p className="about-info">
            Celebrity Styles Hair Salon is your one stop shop for organic hair care. With our skilled <br/>and experienced hairstylists you are sure to come out a star!
          </p>   
          <p className="mobile-number-info"> Mobile number: 09171386028 </p>
          <p className="email-info">Gerlynbatara@gmail.com</p>

          <div className="copyright">
            <p>© 2025 Celebrity Styles Hair Salon</p> 
          </div>
        </div>


      </div>
  




  );
}

  export default Promos;