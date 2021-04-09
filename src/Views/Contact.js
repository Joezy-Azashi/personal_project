import React, { Component } from 'react'
import { SocialIcon } from 'react-social-icons';

function Contact(){

    return(
        <div>
            <div className="contactHeader">
                
            </div>
            <main className="maincontent">
            <div className="row mt-5">
                <div className="col-md-4 mb-2 text-center">
                    <h4><a className="phoneNumber" href={`tel:${+233241614050}`}>+233 24 161 4050</a></h4>
                    <div style={{color: "gray"}}>
                        <h6>Monday - Friday</h6>
                        <h6>8AM - 4:30PM </h6>
                    </div>
                </div>
                <div className="col-md-4 mb-2 text-center" style={{color: "gray"}}>
                    <h4>COPORATE OFFICE</h4>
                    <h6>HNO. 4 Amponsah Street</h6>
                    <h6>Kwesimintsim, Takoradi, Ghana</h6>
                </div>
                <div className="col-md-4 mb-2 text-center" style={{color: "gray"}}>
                    <h4>POSTAL ADDRESS</h4>
                    <h6>P. O. Box TD 233</h6>
                    <h6>Takoradi, Ghana</h6>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col-md-4 text-center" style={{margin: "auto"}}>
                    <div className="mb-4">
                        <SocialIcon target="_blank" rel="noopener" title="www.facebook.com" className="mr-2" url="https://www.facebook.com" fgColor="#ffff" style={{ height: 40, width: 40}} />
                        <SocialIcon target="_blank" rel="noopener" title="www.instagram.com" className="mr-2" url="https://www.instagram.com" fgColor="#ffff" style={{ height: 40, width: 40 }} />
                        <SocialIcon target="_blank" rel="noopener" title="www.youtube.com" className="mr-2" url="http://www.youtube.com/" fgColor="#ffff" style={{ height: 40, width: 40 }}/>
                        <SocialIcon target="_blank" rel="noopener" title="www.linkedin.com" className="mr-2" url="https://www.linkedin.com" fgColor="#ffff" style={{ height: 40, width: 40 }} />
                        <SocialIcon target="_blank" rel="noopener" title="www.twitter.com" className="" url="https://www.twitter.com" fgColor="#ffff" style={{ height: 40, width: 40 }} />
                    </div>
                </div>
                <div className="col-md-8 text-center" style={{margin: "auto"}}>
                <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3975.16587223299!2d-1.7907650357365816!3d4.911896041158958!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sgh!4v1617806196743!5m2!1sen!2sgh"
                width="90%" height="250"
                style={{border: "0"}} allowfullscreen="" loading="lazy">
                </iframe>
                </div>
            </div>
            </main>
        </div>
    )
}

export default Contact