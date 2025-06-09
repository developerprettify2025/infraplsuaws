"use client";

import EnquireForm from '../components/EnquireForm';
import ProjectGallery from '../components/ProjectGallery';
import RelatedProject from '../components/RelatedProject';
import '../styles/sector/sector.css';
import Link from 'next/link';
import parse from "html-react-parser";
import enterView from 'enter-view';
import '../public/assets/css/animate.css';
import { useEffect, useState } from "react";
import API_url from "../app/API";
import axios from "axios";
const ProjectDetailPage = (pageurl) => {
    const [pageData, setPageData] = useState({});
    const [moreData, setMoreData] = useState([]);
    const [relatedProjects, setRelatedProjects] = useState([]);
    const [Gallery, setGallery] = useState([]);
    const [activeTab, setActiveTab] = useState();
    const API_CALL_URL = API_url[0]?.web_url;
    useEffect(() => {
        if (!pageurl) return;

        axios.get(`${API_CALL_URL}/api/${pageurl.pageurl}`)
            .then(res => {
                const {
                    data = {},
                    more = [],
                    relatedProjects = [],
                    projectGallery = []
                } = res.data;

                if (!data?.ProjectName) {
                    router.push('/something-went-wrong');
                    return;
                }

                setActiveTab(data?.sectorwith?.SectorNameURL);
                setPageData(data);
                setMoreData(more);
                setRelatedProjects(relatedProjects);
                setGallery(projectGallery);
            })
            .catch(err => {
                console.error(err);
                router.push('/something-went-wrong');
            });
    }, []);
    useEffect(() => {
    if (
        typeof window !== "undefined" &&
        window.innerWidth > 1007 &&
        pageData?.ProjectName // or another check to ensure data is ready
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
            {pageData?.ProjectName && (
                <main>
                    <div className="banner prodetails-banner center-banner">
                        <div className="bg">
                            <img src={`${API_CALL_URL}/BackEndImage/ProjectImage/${pageData.ProjectBannerImage}`} alt={pageData.ProjectNameURL} title={pageData.ProjectName} />
                            <div className="banner-wrapper">
                                <div className="container">
                                    <div className="heading" data-animate="fade-up">
                                        <h2>{pageData.ProjectName}</h2>
                                        <p>{pageData.ProjectTagline}</p>
                                        <ul className="details flex">
                                            <li>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" fillRule="evenodd"><path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"></path><path fill="#fff" d="M12 2a9 9 0 0 1 9 9c0 3.074-1.676 5.59-3.442 7.395a20.4 20.4 0 0 1-2.876 2.416l-.426.29l-.2.133l-.377.24l-.336.205l-.416.242a1.87 1.87 0 0 1-1.854 0l-.416-.242l-.52-.32l-.192-.125l-.41-.273a20.6 20.6 0 0 1-3.093-2.566C4.676 16.589 3 14.074 3 11a9 9 0 0 1 9-9m0 2a7 7 0 0 0-7 7c0 2.322 1.272 4.36 2.871 5.996a18 18 0 0 0 2.222 1.91l.458.326q.222.155.427.288l.39.25l.343.209l.289.169l.455-.269l.367-.23q.293-.186.627-.417l.458-.326a18 18 0 0 0 2.222-1.91C17.728 15.361 19 13.322 19 11a7 7 0 0 0-7-7m0 3a4 4 0 1 1 0 8a4 4 0 0 1 0-8m0 2a2 2 0 1 0 0 4a2 2 0 0 0 0-4"></path></g></svg>
                                                <div className="loc-det">
                                                    <h6>Location</h6>
                                                    <p>{pageData?.countrywith?.CountryName}</p>
                                                </div>
                                            </li>
                                            <li>
                                                <img src={`https://infraplusadmin.hellopci.com/BackEndImage/SectorImage/${pageData?.sectorwith?.SectorImage}`} alt={pageData?.sectorwith?.SectorNameURL} title={pageData?.sectorwith?.SectorName} width="24px" />
                                                <div className="loc-det">
                                                    <h6>Sector</h6>
                                                    <p>{pageData?.sectorwith?.SectorName}</p>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="form-wrapper">
                                        <div className="title">
                                            <h6>Talk to Our Experts</h6>
                                        </div>
                                        <EnquireForm Type="Sector Enquiry" Sub_type={pageData.ProjectName} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <section>
                        <div className="sector-detailA sec-pad">
                            <div className="container flex over-hidden">
                                {pageData.Description !== "" && pageData.Description !== "<p><br></p>" && (
                                    <div className="colA" data-animate="fade-right">
                                        {parse(pageData.Description)}
                                    </div>
                                )}
                                <div className="colB" data-animate="fade-left">
                                    {Gallery.length > 0 && (
                                        <>
                                            <h3>Project Gallery</h3>
                                            <div className="project-gallery">
                                                {Gallery.map((gallery, index) => (
                                                    <ProjectGallery key={index}
                                                        zoomImg={`https://infraplusadmin.hellopci.com/BackEndImage/ProjectGalleryImage/${gallery.ProjectGalleryImage}`}
                                                        mainImg={`https://infraplusadmin.hellopci.com/BackEndImage/ProjectGalleryImage/${gallery.ProjectGalleryImage}`}
                                                    />
                                                ))}
                                            </div>
                                        </>
                                    )}
                                    {moreData.length > 0 && (
                                        <>
                                            <h3>More Sectors</h3>
                                            <ul>
                                                {moreData.map((sector, index) => (
                                                    <li key={index} className={activeTab === sector.SectorNameURL.toString() ? "active" : ""}>
                                                        <Link href={`/${sector.SectorNameURL}`}>
                                                            <img src={`https://infraplusadmin.hellopci.com/BackEndImage/SectorImage/${sector.SectorImage}`} alt={sector.SectorNameURL} title={sector.SectorName}/>
                                                            {sector.SectorName}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </section>                    
                    {relatedProjects.length > 0 && (
                        <section>
                            <div className="sector-detailB sec-pad">
                                <div className="container">
                                    <div className="heading">
                                        <h3>More Projects</h3>
                                    </div>
                                    <RelatedProject relatedProjects={relatedProjects} />
                                </div>
                            </div>
                        </section>
                    )}
                </main>
            )}
        </>
    );
};

export default ProjectDetailPage;