import React from "react"
import MessengerCustomerChat from 'react-messenger-customer-chat';
import "./salon.css"
import "./salonbody.css"

const Salon = () => {
    return (
        <div>
            <MessengerCustomerChat
                pageId="632859156576793"
                appId="<APP_ID>"
                htmlRef="<REF_STRING>"
            />
            <div className="header">
                <div class="logo-container">
                    <img className="logo" src={require('../images/celeblogo.png')} />
                </div>
                <div className="navigation-bar">
                    <a href={window.apihost + "home"}> <button className="active-home">HOME</button></a>
                    <a href={window.apihost + "promos"}><button>PROMOS</button></a>
                    <a href={window.apihost + "services"}><button>SERVICES</button></a>
                    <a href={window.apihost + "contact"}><button>CONTACT</button></a>
                </div>

            </div>

            <div className="bio">
                With our skilled and experienced hairstylist you are sure to come out a star!
            </div>

            <div className="social-bar">
                <a href="https://web.facebook.com/celebstyles.hairsalon"><img src={require('../images/fb.png')} /></a>
                <a href="https://www.tiktok.com/@celebritystyleshairsalon"><img src={require('../images/tiktok.png')} /></a>

            </div>

            <div className="model-container">
                <img class="model-pic" src={require('../images/model.jpg')} />

                <div className="message"><span class="letter-s">S</span>tart your dreams with Celebrity Styles Hair Salon
                    <a href={window.apihost + "booking"}><button>Book an Apointment</button></a>
                </div>

            </div>

            <div className="follow-link">
                <a href="https://www.tiktok.com/@celebritystyleshairsalon"><button class="follow-message">FOLLOW US ON TIKTOK</button></a>
                <a href="https://www.tiktok.com/@celebritystyleshairsalon"><button class="tiktok-user">@celebritystyleshairsalon</button></a>
            </div>

            <div className="sample-container">
                <img className="hair1" src={require('../images/hair1.jpg')} />
                <img className="hair2" src={require('../images/hair2.jpg')} />
                <img className="hair3" src={require('../images/hair3.jpg')} />
            </div>
            <div className="second-layer-sample">
                <img className="hair4" src={require('../images/hair4.jpg')} />
                <img className="hair5" src={require('../images/hair5.jpg')} />
                <img className="hair6" src={require('../images/hair6.jpg')} />
            </div>

            <div className="footer">
                <img className="logo-footer" src={require('../images/celeblogo.png')} />
                <p className="about-salon">
                    About Celebrity Styles Hair Salon
                </p>
                <p className="about-info">
                    Celebrity Styles Hair Salon is your one stop shop for organic hair care. With our skilled <br />and experienced hairstylists you are sure to come out a star!
                </p>
                <p className="mobile-number-info"> Mobile number: 09171386028 </p>
                <p className="email-info">Gerlynbatara@gmail.com</p>

                <a href={window.apihost + "booking"}><button className="book-button-footer">Book an Apointment</button></a>

                <div className="copyright">
                    <p>© 2025 Celebrity Styles Hair Salon</p>
                </div>
            </div>



        </div>







    );
}

export default Salon;