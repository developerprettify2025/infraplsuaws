"use client"
import BannerWrapper from '../components/BannerWrapper';
import '../styles/aboutus/aboutus.css'
import '../styles/home/home.css'
import Image from "next/image"
import AboutJourney from "../components/AboutJourney"
import WorldMap from '../components/WorldMap';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules"
import "swiper/css"; 
import enterView from 'enter-view';
import '../public/assets/css/animate.css'
import { useEffect, useRef, useState } from 'react';
import API_url from "../app/API";
import parse from "html-react-parser";
import axios from "axios";
import Link from 'next/link';
import StaticData from '../public/data/StaticData.json';

const Team = [
    {
        imgSrc : "/assets/images/about/profile1.jpg", 
        name: "Sandeep Kumar Chhamunya ",
        desgination: "Director"
    },
    {
        imgSrc : "/assets/images/about/profile1.jpg", 
        name: "Sandeep Kumar Chhamunya ",
        desgination: "Director"
    },
    {
        imgSrc : "/assets/images/about/profile1.jpg", 
        name: "Sandeep Kumar Chhamunya ",
        desgination: "Director"
    },
    {
        imgSrc : "/assets/images/about/profile1.jpg", 
        name: "Sandeep Kumar Chhamunya ",
        desgination: "Director"
    },
    {
        imgSrc : "/assets/images/about/profile1.jpg", 
        name: "Sandeep Kumar Chhamunya ",
        desgination: "Director"
    },
]

const homeAbout= StaticData.Index.about;
const { Services } = StaticData.AboutUs
const AboutUsPage = () => {
    const [pageData, setpageData] = useState([]);
    const [activeTab, setActiveTab] = useState("tab1")
    const swiperRef = useRef(null)
    const API_CAll_Url = API_url[0]?.web_url;
    useEffect(() => {
        if (!API_CAll_Url) return;
        
        const id = "2";
        axios.get(`${API_CAll_Url}/meta_data/${id}`)
            .then(res => setpageData(res.data.result || {}))
            .catch(console.error);

        
    }, []);

    useEffect(() => {
        setTimeout(() => {
        if (swiperRef.current?.navigation) {
            swiperRef.current.navigation.update();
        }
        }, 100)
    }, []);

    return (
        <>
            <main>
                <BannerWrapper
                    className="aboutus-banner"
                    mediaType="video"
                    mediaSrc={`${API_CAll_Url}/BackEndImage/StaticPageImage/${pageData.StaticPageImage}`}
                    bannerPosition="left"
                    title={pageData.StaticPageName}
                    desc={pageData.SmallDescription}
                />
                <section>
                    <div className="about-secA aboutus-secA sec-pad">
                        <div className="container">
                            <div className="heading">
                                <div className="icon">
                                    <Image src="/assets/icon/quote.svg" alt="quote" width={51} height={36} />
                                </div>
                                <h3>Infraplus Consulting Pvt. Ltd. is a leading infrastructure consulting firm specializing in providing innovative, sustainable, and efficient engineering solutions. With a foundation built on experience and expertise, we have been delivering quality consultancy services across the globe, shaping the future of infrastructure with precision, dedication, and responsibility.</h3>
                                <div className="counter-wrapper">
                                    <div className="count-info-wrap">
                                        <div className="count-info">
                                            <Image src="/assets/icon/world-dark.svg" width={35} height={35} alt="world" />
                                            <h6>20+ Countries</h6>
                                            <p>Concept to Commissioning Services</p>
                                        </div>
                                    </div>
                                    <div className="count-info-wrap">
                                        <div className="count-info">
                                        <Image src="/assets/icon/road.svg" width={35} height={35} alt="road" />
                                            <h6>1000+ </h6>
                                            <p>Projects Delivered</p>
                                        </div>
                                    </div>
                                    <div className="count-info-wrap">
                                        <div className="count-info">
                                        <Image src="/assets/icon/hands.svg" width={35} height={35} alt="road" />
                                            <h6>500+ </h6>
                                            <p>Clients</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section>
                    <div className="about-secB aboutus-secB sec-pad">
                        <div className="container flex">
                            <div className="colA">
                                <div className="video-icon">
                                    <video src="/assets/video/about-video.mp4" width={407} height={407} autoPlay muted loop playsInline></video>
                                </div>
                            </div>
                            <div className="colB">
                                <h3>Who We are</h3>
                                <p>{parse(homeAbout.aboutDescription)}</p>
                                <h4>Our Services</h4>
                                <ul>
                                    {
                                        Services.map((service, index) => (
                                            <li key={index} dangerouslySetInnerHTML={{ __html: service.content }} />
                                        ))
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
                <section>
                    <div className="about-secC sec-pad gray-bg">
                        <div className="container flex">
                            <div className="colA">
                                <h2>Infra Consulting</h2>
                            </div>
                            <div className="colB">
                                <p>Infraplus provides innovative and impartial advice with a broad range of capabilities and proven execution skills. It is committed to providing its clients with the highest quality of services based on a deep understanding of their needs which has been built up over many years within each individual.</p>
                                <Link href="/projects" className='btn'>Check Our Selected Projects</Link>
                            </div>
                        </div>
                    </div>
                </section>
                <section>
                    <div className="vision-mission sec-pad">
                        <div className="container">
                            <div className="vision-nav tab-nav flex">
                                <li className={activeTab === "tab1" ? "active" : ""} onClick={() => setActiveTab("tab1")}>Vision</li>
                                <li className={activeTab === "tab2" ? "active" : ""} onClick={() => setActiveTab("tab2")}>Mission</li>
                            </div>
                            <div className="tab-nav-content">
                                <div className={`tabs ${activeTab === "tab1" ? "active" : ""}`}>
                                    <p>At Infraplus Consulting, we imagine a world where infrastructure empowers people — where well-planned roads, clean water systems, smart urban planning, and reliable energy networks become the backbone of thriving communities. Our vision is to help build that world — one project, one partnership, one innovation at a time.</p>
                                    <p>We see ourselves not just as consultants, but as long-term partners in progress — bringing together engineering expertise, sustainability, and purpose to shape cities and rural regions into places where people can live better, work smarter, and grow stronger. We aim to be the name behind transformative projects that leave a lasting, positive impact.</p>
                                </div>
                                <div className={`tabs ${activeTab === "tab2" ? "active" : ""}`}>
                                    <p>Our mission is to turn great ideas into meaningful infrastructure that solves real-world challenges. From the earliest sketches to the final touches on the ground, we work closely with clients to deliver end-to-end consulting services that are practical, future-ready, and tailored to local needs.</p>
                                    <p>We’re driven by more than engineering — we’re driven by outcomes. That means staying curious, pushing boundaries, and always thinking about how our work can be more inclusive, efficient, and sustainable. Whether it’s a rural water scheme in India or an industrial township in Africa, we’re here to make every project count — for our clients, for communities, and for the future.</p>
                                </div>
                            </div>
                        </div>
                    </div>  
                </section>
                <section>
                    <div className="about-secE sec-pad">
                        <div className="container">
                            <div className="heading">
                                <h3>Our Leadership</h3>
                            </div>
                            <div className="main_wrapper">
                                <div className="colB">
                                <figure>
                                    <Image src="/assets/images/about/ceo.jpg" alt="profile" width="314" height="290"></Image>
                                </figure>
                            </div>
                            <div className="colA">
                                <div className="scroll">
                                    <div className="content">
                                        <p>At <strong>Infraplus Consulting</strong>, our journey over the past 10 years has been about creating lasting value through engineering solutions that stand the test of time. With expertise in designing and delivering complex infrastructure projects, we focus on sectors including <strong>Industrial Parks & SEZs, Transportation, Water & Sanitation, Agriculture, and Environmental Sustainability</strong>.</p>
                                        <p>In the last decade, we have successfully completed projects in over <strong>20 countries</strong>, <strong>including India, Nigeria, The Gambia, Yemen, Sri Lanka, Malaysia, Oman</strong>, and <strong>Timor-Leste</strong>, to name a few. Our global presence highlights our credibility and ability to address diverse infrastructure challenges worldwide.</p>
                                        <p>As the Founder and CEO of <strong>Infraplus Consulting</strong>, I am incredibly proud of the work we’ve done and the impact we’ve made globally. We have built a reputation for delivering innovative solutions and excellent service to our clients, ensuring that each project is approached with dedication and the highest standards.</p>
                                        <p>Our success is built on a team of professionals who bring together deep technical expertise and a shared commitment to excellence. From transportation networks to industrial parks, we work collaboratively with our clients to turn their visions into reality.</p>
                                        <p>I believe that <strong>Infraplus</strong> is more than just a consultancy; we are a partner in your infrastructure journey. Together, we will continue to innovate, solve problems, and build a better, more sustainable future.</p>
                                    </div>
                                </div>
                                <div className='designation'>
                                    <h6>Sandeep Kumar Chhamunya</h6>
                                    <p>Founder &amp; CEO | Infraplus Consulting</p>
                                    <Image src="/assets/icon/linkedin-fill.svg" alt="linkedin" width="23" height="23"></Image>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section>
                    <div className="impact-sec sec-pad gray-bg">
                        <div className="container flex">
                            <div className="colA">
                                <figure>
                                    <Image src="/assets/images/about/impact.jpg" alt="profile" width="314" height="290"></Image>
                                </figure>
                            </div>
                            <div className="colB">
                                <h3>Our Impact</h3>
                                <p>Infraplus Consulting’s impact extends beyond just infrastructure development. By fostering sustainability, optimizing resources, and ensuring project excellence, we contribute significantly to regional growth and economic development. We have delivered <strong>300+ projects</strong> globally, improving livelihoods and enhancing connectivity for communities and industries.</p>
                                <h4>Key Projects</h4>
                                <ul>
                                    <li><strong>Industrial Parks and Economic Zones:</strong> Designing and planning large-scale
                                    industrial parks and economic zones, such as the Green Agro Allied Economic
                                    Zone in Kaduna, Nigeria (1510 Ha), and the Katsina Green Industrial Park in
                                    Nigeria (800 Ha), shaping the landscape for industrial growth.</li>
                                    <li><strong>Transportation Infrastructure:</strong> Providing design, planning, and construction
                                    management services for critical infrastructure projects like Bus Terminals in
                                    Andaman &amp; Nicobar Islands and Tripura, India, ensuring better urban mobility and
                                    transportation networks.</li>
                                    <li><strong>Water &amp; Wastewater Management:</strong> Developing sustainable water supply and
                                    wastewater management solutions for various industrial and residential projects
                                    across the globe, enhancing quality of life.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
                 <section>
                    <div className="home-secF values-sec sec-pad">
                        <div className="container">
                            <div className="heading text-center" data-animate="fade-up">
                                <h3>Our Values</h3>
                                <p>Empowering Partnerships, Driving Success</p>
                            </div>
                            <div className="why-section over-hidden">
                                <div className="why-grid" data-animate="zoom-out">
                                    <div className="item">
                                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 32 32"><path fill="#000" d="M20 8v2h6.586L18 18.586l-4.293-4.293a1 1 0 0 0-1.414 0L2 24.586L3.414 26L13 16.414l4.293 4.293a1 1 0 0 0 1.414 0L28 11.414V18h2V8Z"></path></svg>   
                                        <h3>Excellence</h3>
                                        <p>We uphold the highest standards of quality in every project, leveraging the latest industry practices and technological advancements.</p>
                                    </div>
                                    <div className="item">
                                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><g fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} color="#000"><path d="M5.143 14A7.8 7.8 0 0 1 4 9.919C4 5.545 7.582 2 12 2s8 3.545 8 7.919A7.8 7.8 0 0 1 18.857 14M7.383 17.098c-.092-.276-.138-.415-.133-.527a.6.6 0 0 1 .382-.53c.104-.041.25-.041.54-.041h7.656c.291 0 .436 0 .54.04a.6.6 0 0 1 .382.531c.005.112-.041.25-.133.527c-.17.511-.255.767-.386.974a2 2 0 0 1-1.2.869c-.238.059-.506.059-1.043.059h-3.976c-.537 0-.806 0-1.043-.06a2 2 0 0 1-1.2-.868c-.131-.207-.216-.463-.386-.974M15 19l-.13.647c-.14.707-.211 1.06-.37 1.34a2 2 0 0 1-1.113.912C13.082 22 12.72 22 12 22s-1.082 0-1.387-.1a2 2 0 0 1-1.113-.913c-.159-.28-.23-.633-.37-1.34L9 19"></path><path d="M8.25 9.75L10.5 12v4m-2.25-5.5a.75.75 0 1 0 0-1.5a.75.75 0 0 0 0 1.5m7.5-.75L13.5 12v4m2.25-5.5a.75.75 0 1 1 0-1.5a.75.75 0 0 1 0 1.5"></path></g></svg>
                                        <h3>Innovation</h3>
                                        <p>Constantly evolving, we integrate the latest technological solutions to create innovative, practical, and sustainable designs.</p>
                                    </div>
                                    <div className="item">
                                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 256 256"><path fill="#000" d="m254.3 107.91l-25.52-51.06a16 16 0 0 0-21.47-7.15l-24.87 12.43l-52.39-13.86a8.14 8.14 0 0 0-4.1 0L73.56 62.13L48.69 49.7a16 16 0 0 0-21.47 7.15L1.7 107.9a16 16 0 0 0 7.15 21.47l27 13.51l55.49 39.63a8.1 8.1 0 0 0 2.71 1.25l64 16a8 8 0 0 0 7.6-2.1l55.07-55.08l26.42-13.21a16 16 0 0 0 7.15-21.46Zm-54.89 33.37L165 113.72a8 8 0 0 0-10.68.61C136.51 132.27 116.66 130 104 122l43.24-42h31.81l27.21 54.41ZM41.53 64L62 74.22l-25.57 51.05L16 115.06Zm116 119.13l-58.11-14.52l-49.2-35.14l28-56L128 64.28l9.8 2.59l-45 43.68l-.08.09a16 16 0 0 0 2.72 24.81c20.56 13.13 45.37 11 64.91-5L188 152.66Zm62-57.87l-25.52-51L214.47 64L240 115.06Zm-87.75 92.67a8 8 0 0 1-7.75 6.06a8 8 0 0 1-1.95-.24l-41.67-10.42a7.9 7.9 0 0 1-2.71-1.25l-26.35-18.82a8 8 0 0 1 9.3-13l25.11 17.94L126 208.24a8 8 0 0 1 5.82 9.7Z"></path></svg>
                                        <h3>Collaboration</h3>
                                        <p>We believe in strong, lasting relationships with our clients, contractors, and stakeholders, driving the success of every project.</p>
                                    </div>
                                    <div className="item">
                                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 256 256"><path fill="#000" d="M247.63 47.89a8 8 0 0 0-7.52-7.52c-51.76-3-93.32 12.74-111.18 42.22c-11.8 19.49-11.78 43.16-.16 65.74a71.3 71.3 0 0 0-14.17 27L98.33 159c7.82-16.33 7.52-33.35-1-47.49c-13.2-21.79-43.67-33.47-81.5-31.25a8 8 0 0 0-7.52 7.52c-2.23 37.83 9.46 68.3 31.25 81.5A45.8 45.8 0 0 0 63.44 176A54.6 54.6 0 0 0 87 170.33l25 25V224a8 8 0 0 0 16 0v-29.49a55.6 55.6 0 0 1 12.27-35a73.9 73.9 0 0 0 33.31 8.4a60.9 60.9 0 0 0 31.83-8.86c29.48-17.84 45.26-59.4 42.22-111.16M47.81 155.6C32.47 146.31 23.79 124.32 24 96c28.32-.24 50.31 8.47 59.6 23.81c4.85 8 5.64 17.33 2.46 26.94l-24.41-24.41a8 8 0 0 0-11.31 11.31l24.41 24.41c-9.61 3.18-18.93 2.39-26.94-2.46m149.31-10.22c-13.4 8.11-29.15 8.73-45.15 2l53.69-53.7a8 8 0 0 0-11.31-11.31L140.65 136c-6.76-16-6.15-31.76 2-45.15c13.94-23 47-35.82 89.33-34.83c.96 42.32-11.84 75.42-34.86 89.36"></path></svg>
                                        <h3>Sustainability</h3>
                                        <p>Committed to environmental responsibility, we integrate sustainable practices in every aspect of our work.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section>
                <div className="home-secG sec-pad">
                    <div className="container">
                        <div className="heading text-center">
                            <h3>Our Global Presence</h3>
                            <p>Infraplus Consulting operates across multiple continents, delivering complex projects in over 20 countries worldwide, including India, Nigeria, Senegal, The Gambia, Democratic Republic of Congo, Oman, and more. Our geographical reach spans across Africa, the Middle East, and Southeast Asia, where we have successfully executed projects in diverse environments and landscapes.</p>
                        </div>
                        <WorldMap />
                    </div>
                </div>
            </section>
            <section>
                <div className="about-secD sec-pad">
                    <div className="container flex">
                        <div className="colA">
                            <h3>What we focus and strive for</h3>
                            <button className="btn solid-white" onClick={() => {
                            document.querySelector('.enquire-pop').classList.add('is-open')
                            document.querySelector('.overlay').classList.add('is-open')
                            document.querySelector('body').classList.add('overflow-hidden')
                        }}>Enquire Now</button>
                            {/* <button className="btn solid-white">Enquire Now</button> */}
                        </div>
                        <div className="colB grid">
                            <div className="item flex">
                                <Image src="/assets/icon/topright-white.svg" alt="arrow" width={45} height={45}></Image>
                                <div className="content">
                                    <h6>Innovative Infrastructure Solutions</h6>
                                    <p>At Infraplus, we provide cutting-edge design and project management services for industrial parks, SEZs, and more, ensuring that every project we undertake meets the highest standards of quality and sustainability.</p>
                                </div>
                            </div>
                            <div className="item flex">
                                <Image src="/assets/icon/topright-white.svg" alt="arrow" width={45} height={45}></Image>
                                <div className="content">
                                    <h6>Global Expertise, Local Solutions</h6>
                                    <p>With our presence in over 20 countries, we adapt our expertise to meet the unique needs of each region, ensuring that our solutions are culturally relevant and responsive to local challenges while maintaining global standards.</p>
                                </div>
                            </div>
                            <div className="item flex">
                                <Image src="/assets/icon/topright-white.svg" alt="arrow" width={45} height={45}></Image>
                                <div className="content">
                                    <h6>Client-Centric Approach to Project Delivery</h6>
                                    <p>We strive to build long-term relationships with our clients, offering personalized service and consistent project delivery. We place a strong emphasis on communication, transparency, and client satisfaction to ensure that every project exceeds expectations.</p>
                                </div>
                            </div>
                            <div className="item flex">
                                <Image src="/assets/icon/topright-white.svg" alt="arrow" width={45} height={45}></Image>
                                <div className="content">
                                    <h6>Comprehensive End-to-End Services</h6>
                                    <p>From conceptual design to project completion, we provide end-to-end services, including feasibility studies, detailed engineering, and project management, ensuring seamless execution and the highest quality throughout the project lifecycle.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div className="team-sec sec-pad">
                    <div className="container">
                        <div className="heading text-center">
                            <h3>Our Team</h3>
                            <p>A dedicated team of professionals committed to delivering innovative infrastructure solutions with integrity, expertise, and a passion for excellence.</p>
                            <div className="swiper-nav team-nav hide-btn-no-loop">
                                <button className="team-prev"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" d="m14 7l-5 5l5 5" strokeWidth="1"/></svg></button>
                                <button className="team-next"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" d="m10 17l5-5l-5-5" strokeWidth="1"/></svg></button>
                            </div>
                        </div>
                        <div className="team_wrapper">
                            <Swiper 
                            className='team-slider'
                            ref={swiperRef}
                            modules={[Navigation]}
                            spaceBetween={20}
                            speed={1000}
                            navigation={{
                                prevEl: ".team-prev",
                                nextEl: ".team-next"
                            }}
                            breakpoints={{
                                0: {
                                    slidesPerView: 1.2,
                                },
                                540: {
                                    slidesPerView: 2,
                                },
                                991: {
                                    slidesPerView: 3,
                                },
                                1200: {
                                    slidesPerView: 3,
                                }
                            }}
                            onSwiper={(swiper) => (swiperRef.current = swiper)}
                        >
                            {Team.map((profile, index) => (
                                <SwiperSlide key={index}>
                                    <Link href="javascript:;">
                                        <div className="profile-item">
                                            <figure>
                                                <Image src={profile.imgSrc} alt="profile" width="314" height="290"></Image>
                                            </figure>
                                            <figcaption>
                                                <h6>{profile.name}</h6>
                                                <p>{profile.desgination}</p>
                                            </figcaption>
                                        </div>
                                    </Link>
                                </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>
                </div>
            </section>
            </main>
        </> 
    )
}
export default AboutUsPage;