"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; 
import "swiper/css/autoplay";
import "../styles/home/home.css"
import { Autoplay } from "swiper/modules";

export default function HomeText({sector}) {
    return(
        <div className="text-slider">
            <Swiper 
            loop= {true}
            autoplay={{ delay: 1000, disableOnInteraction: false,}}
            direction="vertical"
            slidesPerView ={1}
            speed={1000}
            modules={[Autoplay]}
        >
            {sector.map((sector, index) => (
                <SwiperSlide key={index}>
                    <h2 className="slider_h2">{sector.SectorName}</h2>
                </SwiperSlide>
            ))}
        </Swiper>
        </div>
    )
}
