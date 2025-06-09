"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; 
import "../styles/career/career.css"
import "swiper/css/navigation"; 
import { Navigation } from "swiper/modules"
import { useEffect, useRef } from "react";
import Image from "next/image";

export default function CareerSlider({CultureItem}) {
    const swiperRef = useRef(null);

    useEffect(() => {
        setTimeout(() => {
        if (swiperRef.current?.navigation) {
            swiperRef.current.navigation.update();
        }
        }, 100)
    }, []);
    return(
        <div className="career-slider">
            <div className="swiper-nav career-nav">
                <button className="career-prev"><Image src="/assets/icon/swiper-arrow.svg" alt="arrow" width={25} height={25} /></button>
                <button className="career-next"><Image src="/assets/icon/swiper-arrow.svg" alt="arrow" width={25} height={25} /></button>
            </div>
            <Swiper 
                ref={swiperRef}
                modules={[Navigation]}
                loop={true}
                spaceBetween={100}
                centeredSlides={true}
                slidesPerView ={1.8}
                speed={1000}
                breakpoints={{
                    0: {
                        slidesPerView: 1.4,
                        spaceBetween: 30
                    },
                    540: {
                        slidesPerView: 1.4,
                        spaceBetween: 30
                    },
                    991: {
                    },
                    1200: {
    
                    }
                }}
                navigation={{
                    prevEl: ".career-prev",
                    nextEl: ".career-next"
                }}
                onSwiper={(swiper) => (swiperRef.current = swiper)}
            >
            {CultureItem.map((Item, index) => (
                <SwiperSlide key={index}>
                    <Image src={Item.image} alt="careers" width={667} height={443} />
                </SwiperSlide>
            ))}
        </Swiper>
        </div>
    )
}
