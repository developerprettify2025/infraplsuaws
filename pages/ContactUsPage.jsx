
"use client"
import BannerWrapper from '../components/BannerWrapper';
import EnquireForm from '../components/EnquireForm';
import '../styles/contact/contact.css'
import Link from "next/link"
import Image from "next/image";
import { useEffect, useState } from "react";
import enterView from 'enter-view';
import '../public/assets/css/animate.css'
import StaticData from '../public/data/StaticData.json';
import API_url from "../app/API";
import axios from "axios";
const ContactUsPage = () => {
    const contactUsform= StaticData.ContactUs.form;
    const [pageData, setpageData] = useState([]);
    const API_CAll_Url = API_url[0]?.web_url; 
    useEffect(() => {
        const id = "3";
        axios.get(`${API_CAll_Url}/meta_data/${id}`)
            .then(res => setpageData(res.data.result || {}))
            .catch(console.error);
    }, []);
    useEffect(() => {
        if(typeof window !== 'undefined' && window.innerWidth > 1007) {
            enterView({
                selector: '[data-animate]',
                offset: 0,
                enter: (el) =>  {
                    el.classList.add('kmr-animate')
                },
                exit: (el) => {
                    el.classList.remove('kmr-animate');
                }
            })
        }
    });
    return (
        <>
            <main>
                {pageData?.StaticPageImage && (
                    <BannerWrapper className='contact-banner center-banner' bannerPosition="center" mediaSrc={`https://infraplusadmin.hellopci.com/BackEndImage/StaticPageImage/${pageData.StaticPageImage}`} title={pageData.StaticPageName} desc={pageData.SmallDescription}/>
                )}
                <section>
                    <div className="contact-secA sec-pad">
                        <div className="container flex over-hidden">
                            <div className="colA" data-animate='fade-right'>
                                <div className="video-icon">
                                    <video src="/assets/video/about-video.mp4" width="{407}" height="{407}" autoPlay muted loop playsInline></video>
                                </div>
                            </div>
                            <div className="colB" data-animate='fade-left'>
                                <h3>Infraplus Consulting Pvt. Ltd.</h3>
                                <div className="contact-grid">                                    
                                    {pageData.OfficeAddress && (
                                        <div className="contact-col">
                                            <div className="icon">
                                                <Image src="/assets/icon/location-grad.svg" width={44} height={44} alt="Address" />
                                            </div>
                                            <h6>Address</h6>
                                            <a href={`${pageData.GoogleMapLink}`} target="_blank">{pageData.OfficeAddress}</a>
                                        </div>
                                    )}
                                    {(pageData.MobileNo || pageData.EmailID || pageData.LandlineNo) && (
                                        <div className="contact-col">
                                            <div className="icon">
                                                <Image src="/assets/icon/location-grad.svg" width={44} height={44} alt="Address" />
                                            </div>
                                            <h6>Phone</h6>
                                            {pageData.MobileNo && (
                                                <Link href={`tel:+91${pageData.MobileNo}`}>+91-{pageData.MobileNo}</Link>
                                            )}
                                            {pageData.LandlineNo && (
                                                <Link href={`tel:+91${pageData.LandlineNo}`}>+91-{pageData.LandlineNo}</Link>
                                            )}
                                            {pageData.EmailID && (
                                                <Link href={`mailto:${pageData.EmailID}`}>{pageData.EmailID}</Link>
                                            )}
                                        </div>
                                    )}
                                    {(pageData.ContactPersonName1 && (pageData.ContactPersonPhone1 || pageData.ContactPersonEmailID1)) && (
                                        <div className="contact-col">
                                            <div className="icon">
                                                <Image src="/assets/icon/location-grad.svg" width={44} height={44} alt="Address" />
                                            </div>
                                            <h6>{pageData.ContactPersonName1}</h6>
                                            {pageData.ContactPersonPhone1 && (
                                                <Link href={`tel:+91${pageData.ContactPersonPhone1}`}>+91-{pageData.ContactPersonPhone1}</Link>
                                            )}
                                            {pageData.ContactPersonEmailID1 && (
                                                <Link href={`mailto:${pageData.ContactPersonEmailID1}`}>{pageData.ContactPersonEmailID1}</Link>
                                            )}
                                            {(pageData.ContactPersonWhatsAppNo1 && pageData.ContactPersonWhatsAppMsg1) && (
                                                <a href={`https://web.whatsapp.com/send?phone=91${pageData.ContactPersonWhatsAppNo1}&text=${pageData.ContactPersonWhatsAppMsg1}`} target='_blank' className="whatsappBtn">
                                                    Whatsapp Chat
                                                    <img src="/assets/icon/right-arrow.svg" width="{25}" height="{25}" />
                                                </a>
                                            )}
                                        </div>
                                    )}
                                    {(pageData.ContactPersonName2 && (pageData.ContactPersonPhone2 || pageData.ContactPersonEmailID2)) && (
                                        <div className="contact-col">
                                            <div className="icon">
                                                <Image src="/assets/icon/location-grad.svg" width={44} height={44} alt="Address" />
                                            </div>
                                            <h6>{pageData.ContactPersonName2}</h6>
                                            {pageData.ContactPersonPhone2 && (
                                                <Link href={`tel:+91${pageData.ContactPersonPhone2}`}>+91-{pageData.ContactPersonPhone2}</Link>
                                            )}
                                            {pageData.ContactPersonEmailID2 && (
                                                <Link href={`mailto:${pageData.ContactPersonEmailID2}`}>{pageData.ContactPersonEmailID2}</Link>
                                            )}
                                            {(pageData.ContactPersonWhatsAppNo2 && pageData.ContactPersonWhatsAppMsg2) && (
                                                <a href={`https://web.whatsapp.com/send?phone=91${pageData.ContactPersonWhatsAppNo2}&text=${pageData.ContactPersonWhatsAppMsg2}`} target='_blank' className="whatsappBtn">
                                                    Whatsapp Chat
                                                    <img src="/assets/icon/right-arrow.svg" width="{25}" height="{25}" />
                                                </a>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section>
                    <div className="contact-secB sec-pad">
                        <div className="container">
                            <div className="heading text-center">
                                <h3>{contactUsform.heading}</h3>
                                <p>{contactUsform.description}</p>
                            </div>
                            <div className="form-container"><EnquireForm className="contact-form" Type="Normal Enquiry" Sub_type="Normal Enquiry" buttonType="solid-white"/></div>
                        </div>
                    </div>
                </section>
                {pageData.GoogleMapIframe && (
                    <section>
                        <div className="contact-secC">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3509.2000052509866!2d77.04092437549275!3d28.413221275785205!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d2364f0609143%3A0x2507b5e9dfc542e7!2sTower%20B1%20Spaze%20I%20Tech%20park!5e0!3m2!1sen!2sin!4v1743684158477!5m2!1sen!2sin"
                                width="100%"
                                height="600"
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                            {/* {parse(pageData.GoogleMapIframe)} */}
                        </div>
                    </section>
                )}
            </main>
        </> 
    )
}
export default ContactUsPage;