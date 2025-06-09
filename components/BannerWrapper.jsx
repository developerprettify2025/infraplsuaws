import "../styles/components/bannerwrapper.css"
import API_url from "../app/API";
import enterView from 'enter-view';
import '../public/assets/css/animate.css'
import React, { useEffect } from "react";
import Image from "next/image";

export default function BannerWrapper({ className="", mediaType="video", mediaSrc="", bannerPosition="", title, desc}) {
     useEffect(() => {
            if (typeof window !== "undefined" && window.innerWidth > 1007){
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

    const API_CAll_Url = API_url[0]?.web_url;
    return(
        <>
            <div className={`banner ${className}`}>
                <div className="bg">
                    {
                        mediaType === "video" ? (
                            <video playsInline autoPlay muted loop width="100%" height="100%" src={mediaSrc}></video>
                        ) : (
                            <Image src={mediaSrc} alt="Banner" width="1440" height="796" />
                        )
                    }
                    <div className="banner-wrapper">
                        <div className="container">
                            <div className={`heading ${bannerPosition}`} data-animate="fade-up">
                                <h2>{title}</h2>
                                <p>{desc}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
