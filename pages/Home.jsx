"use client";
import Image from 'next/image';
import '../styles/home/home.css';
import Link from 'next/link';
import ProjectSlider from '../components/ProjectSlider';
import SectorSlider from '../components/SectorSlider';
import ServiceTabbing from '../components/ServicetTabbing';
import ClientSlider from '../components/ClientSlider';
import HomeText from '../components/HomeText';
import WorldMap from '../components/WorldMap';
import { useEffect, useState } from "react";
import '../public/assets/css/animate.css';
import parse from "html-react-parser";
import API_url from "../app/API";
import axios from "axios";
import StaticData from '../public/data/StaticData.json';
import enterView from 'enter-view';
const HomePage = () => {
    const [pageData, setpageData] = useState([]);
    const [ServiceData, setServiceData] = useState([]);
    const [SectorData, setSectorData] = useState([]);
    const [ProjectData, setProjectData] = useState([]);
    const [LogoData, setLogoData] = useState([]);
    const homeService= StaticData.Index.service;
    const homeSector = StaticData.Index.sector;
    const homeProject = StaticData.Index.project;
    const homeClient = StaticData.Index.client;
    const homeAbout= StaticData.Index.about;
    const homeWhyChoose= StaticData.Index.whyChoose;    
    const homeWhyChooseItem = StaticData.Index.whyChoose.items;
    const homeCareer= StaticData.Index.career;
    const homeContactus= StaticData.Index.contactus; 
    const API_CAll_Url = API_url[0]?.web_url; 
    
    useEffect(() => {
         if (!API_CAll_Url) return;          
        const id = "1";
        const fetchMetaData = async () => {
            try {
                axios.get(`${API_CAll_Url}/meta_data/${id}`)
                .then(res => setpageData(res.data.result || {}))
                .catch(console.error);
            
                axios.get(`${API_CAll_Url}/home_all_data`)
                .then(res => {
                    const { homeService = [], homeSector = [], homeProject = [], homeLogo = []} = res.data;
                    setServiceData(homeService);
                    setSectorData(homeSector);
                    setProjectData(homeProject);
                    setLogoData(homeLogo);
                })
                .catch(console.error);
            }
            catch (error) {
                console.error('Error fetching metadata:', error);
            }
        };
        fetchMetaData();
    }, [API_CAll_Url]);

    useEffect(() => {
        if (typeof window !== 'undefined' && window.innerWidth > 1007) {
            enterView({
                selector: '[data-animate]',
                offset: 0,
                enter: (el) => {
                el.classList.add('kmr-animate');
                },
                exit: (el) => {
                el.classList.remove('kmr-animate');
                },
            });
        }
    });
    return (
        <>
            <main>
                <div className="banner home-banner">
                    <div className="bg">
                        <video autoPlay muted loop playsInline width='100%' height="100%" src={`${API_CAll_Url}/BackEndImage/StaticPageImage/${pageData.StaticPageImage}`} ></video>
                        <div className="banner-wrapper">
                            <div className="container">
                                <div className="heading" data-animate="fade-up">
                                    <h2>Infrastructure</h2>
                                    <HomeText sector={SectorData}/>
                                    <h2>Consultancy</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {ServiceData.length > 0 && (
                    <section>
                        <div className="home-secA sec-pad" data-animate="fade-up">
                        <div className="container">
                            <div className="heading">
                            <h6>{homeService.heading}</h6>
                            <p>{homeService.description}</p>
                            </div>
                            <ServiceTabbing ServiceTab={ServiceData} />
                        </div>
                        </div>
                    </section>
                )}
                {SectorData.length > 0 && (
                    <section>
                        <div className='home-secB sec-pad gray-bg' data-animate="fade-up">
                            <div className='container'>
                                <div className='heading flex'>
                                    <h2>{homeSector.heading}</h2>
                                    <p>{homeSector.description}</p>
                                </div>
                                <SectorSlider SectorTab={SectorData || {}}/>
                            </div>
                        </div>
                    </section>
                )}
                <section>
                    <div className="home-secC sec-pad">
                        <div className="container">
                            <div className="flex over-hidden">
                                <div className="colA" data-animate="fade-right">
                                    <h2>{homeAbout.heading}</h2>
                                    <p>{parse(homeAbout.description)} </p>
                                    <div className="counter-wrapper">
                                        <div className="count-info-wrap">
                                            <div className="count-info">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 2048 2048"><path fill="#000" d="M496 883q13 0 29 4t32 11t32 13t29 12l-16 2q-8 1-17 1q-17 0-31-5t-26-13t-24-12t-22-6q-10 0-18 4t-16 9q0-4-7-4q7-7 26-11t29-5m135 45q41 0 75 14q-14 5-28 8t-29 4q-20 0-36-4q5-8 10-10t8-12M1024 0q141 0 271 37t244 103t208 161t160 207t104 244t37 272q0 141-37 271t-103 244t-161 208t-207 160t-244 104t-272 37q-141 0-271-37t-244-103t-208-161t-160-207t-104-244t-37-272q0-141 37-271t103-244t161-208t207-160T752 37t272-37m762 555q-14-22-28-42t-29-41q-2 9-5 13t-4 18q0 9 7 17t18 16t22 12t19 7m-69-98q0 8-3 11h6q4 0 6 1zm-693 1463q114 0 223-29t206-82t180-130t145-172q-13-30-25-61t-12-64q0-36 3-58t7-39t4-29t-3-31t-17-41t-37-62q1-7 3-19t4-25t1-24t-5-19q-26-3-54-11t-50-24l6-5q-13 3-26 8t-25 11t-26 8t-27 4l-16-2l3-7q-14 4-30 10t-31 6q-10 0-29-7t-38-17t-34-22t-15-23l2-3q-5-6-13-11t-15-10t-13-11t-5-14l11-9l-23-3l-8-30q2 5 9 4t11-4l-36-19l25-64q-14-52-7-80t27-46t44-36t49-49l-3-12l66-80l15-2q28 0 63-2t71-7t71-10t64-13q-32-38-67-72t-75-65q-11 4-27 11t-32 18t-25 24t-11 27l6 19q-18 29-40 36t-45 8t-48 0t-48 9l-16-34l15-58l-17-25l173-54q-11-28-36-42t-55-14v-10l56-9q-93-46-193-70t-205-24q-87 0-172 17t-164 49t-153 80t-135 108q26 0 40 13t26 29t25 29t35 14l16-12l-2-22l33-47l-26-74q5-3 15-10t17-7q30 0 46 3t28 11t21 23t28 38l36-28q10 4 32 13t45 22t39 27t17 26q0 15-11 24t-29 15t-37 9t-38 8t-29 10t-12 17l58 19q-20 17-43 31t-48 26l4 17l-92 36v28l-7 3l5-35l-4-1q-7 0-8 3t-1 7t2 8t1 6l-13-7l2 4q0 3 3 9t8 11t8 10t4 5q0 3-4 6t-10 4t-8 3t0 1q14 0 6 2t-25 10t-31 23t-16 44q0 17 1 33t-1 33q-14-38-42-58t-68-20l-43 4l21 14q-17-2-35-4t-37-1t-34 8t-30 21l-6 45q0 32 14 52t49 21q30 0 59-9t57-21q-9 22-20 42t-16 44l13 6q24-16 44-5t39 32t39 43t43 32l-34 18l-80-45q1 2 2 9t-1 3l-36-61q-32-1-68-10t-73-24t-69-33t-59-38l-7 107q0 122 33 238t93 218t147 186t193 143q-5-21-1-42t10-42t13-42t7-43q0-32-10-67t-24-71t-31-71t-27-66t-16-58t6-47l-15-7q6-14 16-27t21-26t17-28t7-30q0-10-4-21t-7-21l21 5q17-39 46-53t73-15q5 0 21 4t34 11t34 11t24 8q0 7 8 9t9 7l-2 8q3 1 14 7t24 15t23 16t14 11q18 0 49 12t68 30t73 43t68 50t49 50t20 44l-34 36q4 51-7 78t-34 45t-53 30t-65 34q0 20-10 43t-25 44t-36 35t-42 14l-42-32q2 2 0 7t-5 2q10 19 5 44t-17 51t-27 49t-27 39q54 14 108 21t109 7"/></svg>
                                                <h6>{homeAbout.Countries}</h6>
                                                <p>{homeAbout.CountriesTagline}</p>
                                            </div>
                                        </div>
                                        <div className="count-info-wrap">
                                            <div className="count-info">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 512 512"><path fill="#000" fillRule="evenodd" d="m356.519 64l91.119 384h-43.85L312.667 64zm-157.208 0L108.19 448H64.362L155.48 64zm78.023 256v106.667h-42.667V320zm0-128v85.333h-42.667V192zm0-106.667v64h-42.667v-64z"/></svg>
                                                <h6>{homeAbout.Project}</h6>
                                                <p>{homeAbout.ProjectTagline}</p>
                                            </div>
                                        </div>
                                        <div className="count-info-wrap">
                                            <div className="count-info">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 512 512"><path fill="#000" fillRule="evenodd" d="m356.519 64l91.119 384h-43.85L312.667 64zm-157.208 0L108.19 448H64.362L155.48 64zm78.023 256v106.667h-42.667V320zm0-128v85.333h-42.667V192zm0-106.667v64h-42.667v-64z"/></svg>
                                                <h6>{homeAbout.Client}</h6>
                                                <p>{homeAbout.ClientTagline}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <Link href="/about-us" className='btn border-black'>Read more</Link>
                                </div>
                                <div className="colB" data-animate="fade-left">
                                    <div className="video-icon">
                                        <video src="/assets/video/about-video.mp4" width={407} height={407} autoPlay muted loop playsInline></video>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {ProjectData.length > 0 && (
                    <section>
                        <div className="home-secD sec-pad gray-bg">
                            <div className="container">
                                <div className="heading">
                                    <h3>{homeProject.heading}</h3>
                                    <p>{homeProject.description}</p>
                                </div>
                                <ProjectSlider ProjectTab={ProjectData || {}}/>
                                <Link href="/projects" className='btn border-black'>View All Projects</Link>
                            </div>
                        </div>
                    
                    </section>
                )}             
                {(LogoData.length > 0) && (
                    <section>
                        <div className="home-secE sec-pad">
                            <div className="container">
                                <div className="heading text-center" data-animate="fade-up">
                                    <h3>{homeClient.heading}</h3>  
                                    <p>{homeClient.description}</p>
                                </div>
                                <div className="clients-section over-hidden">
                                    {(LogoData.length > 0) && (
                                        <>
                                            <ClientSlider clients={LogoData.filter((_, index) => index % 2 !== 0)} />
                                            <ClientSlider className='logo-sider2' direction={true} clients={LogoData.filter((_, index) => index % 2 !== 1)} />
                                        </>
                                    )}
                                    {/*  */}
                                    {/* <div className="client-grid" data-animate="zoom-out">
                                        {LogoData.map((logo, index) => (
                                            <div className="item" key={index}>
                                                <Image src={`${API_CAll_Url}/BackEndImage/LogoImage/${logo.LogoImage}`} width={200} height={112} alt={logo.LogoNameURL} title={logo.LogoName} />
                                            </div>
                                        ))}
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </section>
                )}
                {homeWhyChooseItem.length > 0 && (
                    <section>
                        <div className="home-secF sec-pad gray-bg">
                            <div className="container">
                                <div className="heading text-center" data-animate="fade-up">
                                    <h3>{homeWhyChoose.heading}</h3>
                                    <p>{homeWhyChoose.description}</p>
                                </div>
                                <div className="why-section over-hidden">
                                    <div className="why-grid" data-animate="zoom-out">
                                        {homeWhyChooseItem.map((whyChoose, index) => (
                                            <div className="item" key={index}>
                                                <img src="/assets/icon/top-right.svg" className='svg' alt="top right arrow" />
                                                <h3>{whyChoose.heading}</h3>
                                                <p>{whyChoose.description}</p>
                                            </div>
                                        ))}
                                    </div>
                                    <Link href="javascript:;" onClick={() => {
                                        document.querySelector('.enquire-pop').classList.add('is-open')
                                        document.querySelector('.overlay').classList.add('is-open')
                                        document.querySelector('body').classList.add('overflow-hidden')
                                    }} className='btn border-black'>Enquire Now</Link>
                                </div>
                            </div>
                        </div>
                    </section>
                )}
                <section>
                    <div className="home-secG sec-pad">
                        <div className="container">
                            <div className="heading text-center" data-animate="fade-up">
                                <h3>Our Global Presence</h3>
                                <p>Infraplus Consulting operates across multiple continents, delivering complex projects in over 20 countries worldwide, including India, Nigeria, Senegal, The Gambia, Democratic Republic of Congo, Oman, and more. Our geographical reach spans across Africa, the Middle East, and Southeast Asia, where we have successfully executed projects in diverse environments and landscapes.</p>
                            </div>
                            <WorldMap />
                        </div>
                    </div>
                </section>
                <section>
                    <div className="home-secH">
                        <div className="call-to-action">
                            <div className="item-md center-item">
                                <figure>
                                    <Image src="/assets/images/home/callto1.jpg" width={635} height={361} alt="Join our team" title="Join our team" />
                                </figure>
                                <figcaption>
                                    <h3>{homeCareer.heading}</h3>  
                                    <p>{homeCareer.description}</p>
                                    <Link href="/career" className='btn btn-white'>Join Now</Link>
                                </figcaption>
                            </div>
                            <div className="item-md center-item">
                                <figure>
                                    <Image src="/assets/images/home/callto2.jpg" width={635} height={361} alt="Let's Collaborate" title="Let's Collaborate" />
                                </figure>
                                <figcaption>
                                    <h3>{homeContactus.heading}</h3>  
                                    <p>{homeContactus.description}</p>
                                    <Link href="/contact-us" className='btn btn-white'>Read More</Link>
                                </figcaption>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </> 
    )
}
export default HomePage;