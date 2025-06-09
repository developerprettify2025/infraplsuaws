"use client"
import BannerWrapper from '../components/BannerWrapper';
import Link from 'next/link'
import { useState, useEffect } from 'react'
import '/styles/sector/sector.css'
import parse from "html-react-parser";
import enterView from 'enter-view';
import '../public/assets/css/animate.css'
import API_url from "../app/API";
import axios from "axios";
import NotFound from "../components/PageNotFound"
import Image from 'next/image';
const SectorsListingPage = () => {    
    const API_CAll_Url = API_url[0]?.web_url;
    const [activeTab, setActiveTab] = useState("0");
    const [pageData, setPageData] = useState({});
    const [SectorData, setSectorData] = useState({});
    useEffect(() => {
        if (!API_CAll_Url) return;
        const id = "7";
        axios.get(`https://infraplusadmin.hellopci.com/meta_data/${id}`)
            .then(res => setPageData(res.data.result || {}))
            .catch(console.error);

        axios.get(`https://infraplusadmin.hellopci.com/sector_all_data`)
            .then(res => {
                const result = res.data.listingSector || [];
                setSectorData(result);
                console.log(result);
            })
            .catch(console.error);
    }, [API_CAll_Url]);
    useEffect(() => {
    if (
        typeof window !== "undefined" &&
        window.innerWidth > 1007 &&
        pageData?.SectorName // or another check to ensure data is ready
    ) {
        const timeout = setTimeout(() => {
            const elements = document.querySelectorAll("[data-animate]");
            if (elements.length > 0) {
                enterView({
                    selector: "[data-animate]",
                    offset: 0,
                    enter: (el) => el.classList.add("kmr-animate"),
                    exit: (el) => el.classList.remove("kmr-animate"),
                });
            }
        }, 100); // Delay to allow DOM update

        return () => clearTimeout(timeout);
    }
}, [pageData]);

    return (
        <>
            <main>
                <BannerWrapper className='project-banner center-banner' bannerPosition="center" mediaSrc={`https://infraplusadmin.hellopci.com/BackEndImage/StaticPageImage/${pageData.StaticPageImage}`} title={pageData.StaticPageName} desc={pageData.SmallDescription}/>
                    <section>
                        <div className="sector_listing_wrapper sec-pad">
                            <div className="container">
                                {SectorData.length > 0 ? (
                                    <div className="sector-grid">
                                    {SectorData.map((sector, index) => (
                                        <Link href={`/${sector.SectorNameURL}`} key={index}>
                                            <div className="sector-col item-md">
                                            <figure>
                                            <Image width="600" height="464" src={`https://infraplusadmin.hellopci.com/BackEndImage/SectorImage/${sector.SectorListImage}`} alt={sector.SectorNameURL} title={sector.SectorName}/>
                                            </figure>
                                            <figcaption>
                                                <img src={`https://infraplusadmin.hellopci.com/BackEndImage/SectorImage/${sector.SectorImage}`} alt={sector.SectorNameURL} title={sector.SectorName}/>
                                                    <p>{sector.SectorName}</p>
                                            </figcaption>
                                        </div>
                                        </Link>
                                    ))}
                                </div>
                                ) :  (
                                    <NotFound title="" desc="Projects not found"/>
                                )}
                            </div>
                        </div>
                </section>
            </main>
        </> 
    )
}
export default SectorsListingPage;