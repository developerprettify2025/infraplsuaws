"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import parse from "html-react-parser";
import axios from "axios";
import enterView from "enter-view";

import EnquireForm from "../components/EnquireForm";
import RelatedProject from "../components/RelatedProject";
import "../styles/sector/sector.css";
import "../public/assets/css/animate.css";

import API_url from "../app/API";

const SectorsDetailPage = ({ pageurl }) => {
    const [pageData, setPageData] = useState({});
    const [moreData, setMoreData] = useState([]);
    const [relatedProjects, setRelatedProjects] = useState([]);
    const [activeTab, setActiveTab] = useState(pageurl);
    const API_CALL_URL = API_url[0]?.web_url;
    useEffect(() => {
        if (!pageurl) {
            redirect("/something-went-wrong");
        }

        axios.get(`${API_CALL_URL}/api/${pageurl}`)
            .then((res) => {
                const {
                    data = {},
                    more = [],
                    relatedProjects = []
                } = res.data;

                setPageData(data);
                setMoreData(more);
                setRelatedProjects(relatedProjects);
            })
            .catch(console.error);
    }, []);
    useEffect(() => {
    if (
        typeof window !== "undefined" &&
        window.innerWidth > 1007 &&
        pageData?.SectorName 
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

    if (!pageData?.SectorName) return null;

    const isValidDescription = pageData.Description && pageData.Description !== "<p><br></p>";
    return (
        <main>
            <div className="banner sector-banner center-banner">
                <div className="bg">
                    <img
                        src={`${API_CALL_URL}/BackEndImage/SectorImage/${pageData.SectorBannerImage}`}
                        alt={pageData.SectorNameURL || "Sector"}
                        title={pageData.SectorName}
                    />
                    <div className="banner-wrapper">
                        <div className="container">
                            <div className="heading" data-animate="fade-up">
                                <h2>{pageData.SectorName}</h2>
                                <p>{pageData.SectorTagline}</p>
                            </div>
                            <div className="form-wrapper">
                                <div className="title">
                                    <h6>Talk to Our Experts</h6>
                                </div>
                                <EnquireForm Type="Sector Enquiry" Sub_type={pageData.SectorName} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {isValidDescription && (
                <section>
                    <div className="sector-detailA sec-pad">
                        <div className="container flex over-hidden">
                            <div className="colA" data-animate="fade-right">
                                {parse(pageData.Description)}
                            </div>

                            {moreData.length > 0 && (
                                <div className="colB" data-animate="fade-left">
                                    <h3>More Sectors</h3>
                                    <ul>
                                        {moreData.map((sector, index) => (
                                            <li
                                                key={index}
                                                className={activeTab === sector.SectorNameURL ? "active" : ""}
                                            >
                                                <Link href={`/${sector.SectorNameURL}`}>
                                                    <img
                                                        src={`${API_CALL_URL}/BackEndImage/SectorImage/${sector.SectorImage}`}
                                                        alt={sector.SectorNameURL}
                                                        title={sector.SectorName}
                                                    />
                                                    {sector.SectorName}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            )}

            {relatedProjects.length > 0 && (
                <section>
                    <div className="sector-detailB sec-pad">
                        <div className="container">
                            <div className="heading">
                                <h3>{pageData.SectorName}</h3>
                            </div>
                            <RelatedProject
                                relatedProjects={relatedProjects}
                                Sector={pageData.SectorName}
                                Sectorsrc={`${API_CALL_URL}/BackEndImage/SectorImage/${pageData.SectorImage}`}
                            />
                        </div>
                    </div>
                </section>
            )}
        </main>
    );
};
export default SectorsDetailPage;