import { useEffect, useRef } from "react"
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; 
import "swiper/css/navigation"
import { Autoplay } from 'swiper/modules';
import Image from "next/image";
import API_url from "../app/API";

export default function ClientSlider({clients, className="", direction=false }) {
    const API_CAll_Url = API_url[0]?.web_url;
    const swiperRef = useRef(null);
    useEffect(() => {
        setTimeout(() => {
        if (swiperRef.current?.navigation) {
            swiperRef.current.navigation.update();
        }
        }, 100)
    }, [])
    return(
         <div className={`client-slider-wrapper ${className}`}>
            <Swiper
                className="client-slider"
                modules={[Autoplay]}
                direction="horizontal"
                autoplay = {{
                    delay: 0,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                    reverseDirection: direction,
                }}
                loop= {true}
                ref={swiperRef}
                spaceBetween={20}
                slidesPerView={4}
                speed={4000}
                breakpoints={{
                    0: {
                        slidesPerView: 4,
                    },
                    540: {
                        slidesPerView: 5,
                    },
                    991: {
                        slidesPerView: 6,
                    },
                }}
                onSwiper={(swiper) => (swiperRef.current = swiper)} 
            >
                {clients.map((logo, index) => (
                    <SwiperSlide key={index}>
                        <figure>
                            <Image src={`${API_CAll_Url}/BackEndImage/LogoImage/${logo.LogoImage}`} width={200} height={100} alt={logo.LogoNameURL} title={logo.LogoName} />
                        </figure>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}