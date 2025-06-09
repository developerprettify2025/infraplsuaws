"use client";
import Image from 'next/image';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; 
import "../styles/components/projectslider.css"
import "swiper/css/navigation"; 
import { Navigation } from "swiper/modules"
import { useEffect, useRef } from "react";
import Link from "next/link"
import API_url from "../app/API";

export default function ProjectSlider({ProjectTab}) {
    const swiperRef = useRef(null);
    const API_CAll_Url = API_url[0]?.web_url;
    useEffect(() => {
        setTimeout(() => {
        if (swiperRef.current?.navigation) {
            swiperRef.current.navigation.update();
        }
        }, 100)
    }, []);
    return(
        <div className="project-slider">
            <div className="swiper-nav projects-nav">
                <button className="projects-prev"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" d="m14 7l-5 5l5 5" strokeWidth="1"/></svg></button>
                <button className="projects-next"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" d="m10 17l5-5l-5-5" strokeWidth="1"/></svg></button>
            </div>
            <Swiper 
            ref={swiperRef}
            modules={[Navigation]}
            spaceBetween={20}
            speed={1000}
            navigation={{
                prevEl: ".projects-prev",
                nextEl: ".projects-next"
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
            {ProjectTab.map((project, index) => (
                <SwiperSlide>
                    <Link href={project.ProjectNameURL}>
                        <div className="item-md" key={index}>
                            <figure>
                                <Image src={`${API_CAll_Url}/BackEndImage/ProjectImage/${project.ProjectImage}`} width={411} height={380} alt={project.ProjectNameURL} title={project.ProjectName} />
                            </figure>
                            <figcaption>
                                <h6>{project.ProjectName}</h6>
                            </figcaption>
                        </div>
                    </Link>
                </SwiperSlide>
            ))}
        </Swiper>
        </div>
    )
}
