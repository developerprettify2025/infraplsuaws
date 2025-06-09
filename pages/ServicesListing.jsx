"use client"
import BannerWrapper from '../components/BannerWrapper';
import '../styles/services/services.css'
import Link from "next/link";
import parse from "html-react-parser";
import { useEffect, useState } from "react";
import enterView from 'enter-view';
import '../public/assets/css/animate.css'
import StaticData from '../public/data/StaticData.json';
import API_url from "../app/API";
import axios from "axios";
import NotFound from "../components/PageNotFound"
import Image from 'next/image';
const ServicesListing = () => {
    const StatickData= StaticData.ServicePage.Section;
    const [pageData, setpageData] = useState([]);
    const [ServiceData, setServiceData] = useState([]);
    const API_CAll_Url = API_url[0]?.web_url; 
    const openPop = () => {
        document.querySelector('.enquire-pop').classList.add('is-open')
        document.querySelector('.overlay').classList.add('is-open')
        document.querySelector('body').classList.add('overflow-hidden')
    }
    useEffect(() => {
        if (!API_CAll_Url) return;
        const id = "5";
        axios.get(`${API_CAll_Url}/meta_data/${id}`)
            .then(res => setpageData(res.data.result || {}))
            .catch(console.error);

        axios.get(`${API_CAll_Url}/service_all_data`)
            .then(res => {
                const result = res.data.listingSerive || [];
                setServiceData(result);
            })
            .catch(console.error);
    }, [API_CAll_Url]);
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
                <BannerWrapper className='services-banner' bannerPosition="center" mediaSrc={`${API_CAll_Url}/BackEndImage/StaticPageImage/${pageData.StaticPageImage}`} title={pageData.StaticPageName} desc={pageData.SmallDescription}/>
                <section className="border-sec">
                    <div className="container">
                        <div className="services-secA">
                            <div className="heading" data-animate="fade-up">
                                <p>{StatickData.description}</p>
                            </div>
                        </div>
                        {ServiceData.length > 0 ? (
                            <div className="services-secB sec-pad">
                                {ServiceData.map((service, index) => (
                                    <div className="step-count" key={index} data-animate="fade-right">
                                        <div className="heading">
                                            <span className="number">{(index + 1).toString().padStart(2, '0')}</span>
                                            <h6>{service.ServiceName}</h6>
                                        </div>
                                        <div className="step-details flex">
                                            <div className="colA">
                                                <Image width="405" height="303" src={`${API_CAll_Url}/BackEndImage/ServiceImage/${service.ServiceListImage}`} alt={service.ServiceNameURL} title={service.ServiceName}/>
                                            </div>
                                            <div className="colB">
                                                {parse(service.ServiceHomeDescription)}
                                                <div className="btn-wrapper">
                                                    <Link href={`/${service.ServiceNameURL}`} className="btn">Read More</Link>
                                                    <button className="btn border-black" onClick={openPop}>Enquire Now</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            ""
                            // <NotFound title="" desc="Projects not found"/>
                        )}
                    </div>
                </section>
            </main>
        </> 
    )
}
export default ServicesListing;