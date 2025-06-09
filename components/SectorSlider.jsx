"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; 
import "../styles/components/travelcard.css"
import "swiper/css/navigation"; 
import parse from "html-react-parser";
import { Navigation } from "swiper/modules"
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import API_url from "../app/API";

export default function SectorSlider({SectorTab}) {
    const API_CAll_Url = API_url[0]?.web_url;
    const swiperRef = useRef(null);
    const firstId = SectorTab.length > 0 ? SectorTab[0].SectorHomeImage : null;
    const [bgImage, setBgImage] = useState(`${API_CAll_Url}/BackEndImage/SectorImage/${firstId}`);
    useEffect(() => {
        setTimeout(() => {
        if (swiperRef.current?.navigation) {
            swiperRef.current.navigation.update();
        }
        }, 100)
    }, []);
    const handleMouseEnter = (event) => {
        const allCards = document.querySelectorAll('.main-card');
        allCards.forEach(card => {
            card.classList.add('hide_bg');
        });
        const newBg = event.currentTarget.getAttribute('data-bg')
        if(newBg) {
            setBgImage(newBg)
        }
    }
    const handleMouseLeave = () => {
        const allCards = document.querySelectorAll('.main-card');
        allCards.forEach(card => {
            card.classList.remove('hide_bg');
        });
    }
    return(
        <div className='destinations-container'id='destinationSection'  style={{backgroundImage: `url(${bgImage})`, transition: '.5s ease-in-out'}} >
            <div className="service-slider">
                <div className="swiper-nav service-nav">
                    <button className="service-prev"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" d="m14 7l-5 5l5 5" strokeWidth="1"/></svg></button>
                    <button className="service-next"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" d="m10 17l5-5l-5-5" strokeWidth="1"/></svg></button>
                </div>
                <Swiper 
                ref={swiperRef} 
                modules={[Navigation]} 
                spaceBetween={0} 
                slidesPerView ={3} 
                speed={1000} 
                navigation={{ prevEl: ".service-prev", nextEl: ".service-next" }} 
                breakpoints={{
                    0: {
                        slidesPerView: 1,
                    },
                    540: {
                        slidesPerView: 2,
                    },
                    991: {

                    },
                    1200: {

                    }
                }}
                onSwiper={(swiper) => (swiperRef.current = swiper)} >
                {SectorTab.map((sector, index) => (
                    <SwiperSlide>
                        <div className="main-card" key={index} style={{
    '--bg-url': `url(${API_CAll_Url}/BackEndImage/SectorImage/${sector.SectorHomeImage})`
  }} data-bg={`${API_CAll_Url}/BackEndImage/SectorImage/${sector.SectorHomeImage}`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                            <div className="content">
                                <h2>{sector.SectorName}</h2>
                                {parse(sector.SectorHomeDescription)}
                                <Link href={`/${sector.SectorNameURL}`} className="btn border-white">Read this sector</Link>
                            </div>
                        </div>   
                    </SwiperSlide>                
                ))}
            </Swiper>
            </div>
        </div>
    )
}
