"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; 
import "../styles/aboutus/aboutus.css"
import "swiper/css/navigation"; 
import "swiper/css/pagination"; 
import { Navigation, Pagination } from "swiper/modules"
import { useEffect, useRef } from "react";
import Image from "next/image";

const slides = [
    {
      year: "2015",
      img: "/assets/images/about/journey1.png",
      title: "Heading 1",
      desc: "Lorem ipsum dolor sit amet consectetur. Ut orci ipsum sapien diam ornare nullam vitae. A ullamcorper facilisis malesuada turpis dui arcu. Amet urna suspendisse justo quis consectetur sem id in et. Ipsum scelerisque quis diam tristique suspendisse urna ut."
    },
    {
      year: "2018",
      img: "/assets/images/about/journey1.png",
      title: "Heading 1",
      desc: "Lorem ipsum dolor sit amet consectetur. Ut orci ipsum sapien diam ornare nullam vitae. A ullamcorper facilisis malesuada turpis dui arcu. Amet urna suspendisse justo quis consectetur sem id in et. Ipsum scelerisque quis diam tristique suspendisse urna ut."
    },
    {
      year: "2020",
      img: "/assets/images/about/journey1.png",
      title: "Heading 1",
      desc: "Lorem ipsum dolor sit amet consectetur. Ut orci ipsum sapien diam ornare nullam vitae. A ullamcorper facilisis malesuada turpis dui arcu. Amet urna suspendisse justo quis consectetur sem id in et. Ipsum scelerisque quis diam tristique suspendisse urna ut."
    },
    {
      year: "2020",
      img: "/assets/images/about/journey1.png",
      title: "Heading 1",
      desc: "Lorem ipsum dolor sit amet consectetur. Ut orci ipsum sapien diam ornare nullam vitae. A ullamcorper facilisis malesuada turpis dui arcu. Amet urna suspendisse justo quis consectetur sem id in et. Ipsum scelerisque quis diam tristique suspendisse urna ut."
    },
    {
      year: "2020",
      img: "/assets/images/about/journey1.png",
      title: "Heading 1",
      desc: "Lorem ipsum dolor sit amet consectetur. Ut orci ipsum sapien diam ornare nullam vitae. A ullamcorper facilisis malesuada turpis dui arcu. Amet urna suspendisse justo quis consectetur sem id in et. Ipsum scelerisque quis diam tristique suspendisse urna ut."
    },
    {
      year: "2020",
      img: "/assets/images/about/journey1.png",
      title: "Heading 1",
      desc: "Lorem ipsum dolor sit amet consectetur. Ut orci ipsum sapien diam ornare nullam vitae. A ullamcorper facilisis malesuada turpis dui arcu. Amet urna suspendisse justo quis consectetur sem id in et. Ipsum scelerisque quis diam tristique suspendisse urna ut."
    },
  ];

export default function AboutJourney() {
    const swiperRef = useRef(null);

    useEffect(() => {
        setTimeout(() => {
        if (swiperRef.current?.navigation) {
            swiperRef.current.navigation.update();
        }
        }, 100)
    }, []);
    return(
        <div className="aboutJourney-slider">
            <div className="about-journey-pagination"></div>
            <div className="swiper-nav about-nav">
                <button className="about-prev"><Image src="/assets/icon/swiper-arrow.svg" alt="arrow" width={25} height={25} /></button>
                <button className="about-next"><Image src="/assets/icon/swiper-arrow.svg" alt="arrow" width={25} height={25} /></button>
            </div>
            <Swiper 
            ref={swiperRef}
            modules={[Navigation, Pagination]}
            loop={false}
            spaceBetween={30}
            slidesPerView ={1}
            speed={1000}
            pagination={{
                el: ".about-journey-pagination",
                clickable: true,
                renderBullet: (index, className) => {
                  return `<div class="${className}">
                  <span class="${index + 1} number">${index + 1}</span>
                  <span class="year">${slides[index].year}</span>
                  </div>`;
                }
            }} 
            navigation={{
                prevEl: ".about-prev",
                nextEl: ".about-next"
            }}
            onSwiper={(swiper) => (swiperRef.current = swiper)} 
            className="about-slider"
        >
            {slides.map((slide, index) => (
                <SwiperSlide key={index} data-year={slide.year}>
                    <div className="item">
                        <figure>
                            <Image src={slide.img} alt="Journey" width={440} height={314} />
                        </figure>
                        <figcaption>
                            <div className="content">
                                <h5>{slide.title}</h5>
                                <div className="desc">
                                    <p>{slide.desc}</p>
                                </div>
                            </div>
                        </figcaption>
                    </div>
                 </SwiperSlide>
            ))}
            </Swiper>
        </div>
    )
}
