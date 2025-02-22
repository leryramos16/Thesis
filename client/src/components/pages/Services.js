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
            <a href={window.apihost + "services"}><button className="active-services">SERVICES</button></a>
            <a href={window.apihost + "contact"}><button>CONTACT</button></a>
        </div>
        
        </div>

          <div className="social-bar">
          <a href="https://web.facebook.com/celebstyles.hairsalon"><img src={require('../images/fb.png')}/></a>
          <a href="https://www.tiktok.com/@celebritystyleshairsalon"><img src={require('../images/tiktok.png')}/></a>
         </div>

         <div class="service">
            <img src={require('../images/service.png')}/>
        </div>

        <div class="price-list">
            <img class="price-list-picture" src={require('../images/pricelist.jpg')}/>
            <img src={require('../images/manicure.jpg')}/>
        </div>
        <div className="service-footer">
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

      </>
  
  
  
  
    );
  }
  
  export default Services;