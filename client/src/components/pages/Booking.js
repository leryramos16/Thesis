import "./booking.css"



function Booking() {
    return (
        
            <div className="header">
            <div class="logo-container">
                <img className="logo" src={require('../images/celeblogo.png')} />
            </div>
                <div className="navigation-bar">
                    <a href={window.apihost + "home"}> <button>HOME</button></a>
                    <a href={window.apihost + "promos"}><button>PROMOS</button></a>
                    <a href={window.apihost + "services"}><button>SERVICES</button></a>
                    <a href={window.apihost + "contact"}><button>CONTACT</button></a>
                </div>

                <div className="social-bar">
                <a href="https://web.facebook.com/celebstyles.hairsalon"><img src={require('../images/fb.png')}/></a>
                <a href="https://www.tiktok.com/@celebritystyleshairsalon"><img src={require('../images/tiktok.png')}/></a>
                </div>

                <div className="booking-container">
                    <img class="booking-pic" src={require('../images/booking.png')} />
                </div>

                <div class="book-now">
                    <div class="book-now-label">Book Now</div>
                    <div class="note">No appointment needed for Haircut Customers. Just walk into our salon anytime during our operating<br /> hours for a fabulous haircut experience.</div>
                    <div class="first-layer">
                        <input class="full-name" type="text" placeholder="Full Name" />
                        <input class="mobile-number" type="text" placeholder="Mobile number" />
                    </div>
                    <div class="second-layer">
                        <input class="hair-stylist" type="text" placeholder="Hair Stylist" />
                        <input class="service-input" type="text" placeholder="Service" />
                    </div>
                    <div class="third-layer">
                        <div class="reservation-time">Reservation time</div>
                    </div>
                    <div class="fourth-layer">
                        <button>08AM</button>
                        <button>09AM</button>
                        <button>10NN</button>
                        <button>11PM</button>
                        <button>12PM</button>
                        <button>01PM</button>
                        <button>02PM</button>
                        <button>03PM</button>
                        <button>04PM</button>
                        <button>05PM</button>
                    </div>           
                    <div class="Reserve-layer">
                        <button class="reserve-button">RESERVE</button>
                    </div> 
                    </div> 
                    <div className="booking-footer">
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


export default Booking;
