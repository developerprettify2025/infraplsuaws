"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import parse from "html-react-parser";
import API_url from "../app/API";
export default function ServiceTabbing({ ServiceTab }) {
    const [activeTab, setActiveTab] = useState("0"); // Default to first tab
    const API_CAll_Url = API_url[0]?.web_url;
    return (
        <>
            {ServiceTab.length > 0 && (
                <div className="services-container">
                    {/* Tab Navigation */}
                    <ul className="tab-nav services-tab-nav flex">
                        {ServiceTab.map((service, index) => (
                            <li key={index} data-tab={index} className={activeTab === index.toString() ? "active" : ""} onClick={() => setActiveTab(index.toString())}>
                                {service.ServiceName}
                            </li>
                        ))}
                    </ul>

                    {/* Tab Content */}
                    <div className="tab-nav-content services-tab-nav-content">
                        {ServiceTab.map((service, index) => (
                            <div key={index} className={`tabs ${activeTab === index.toString() ? "active" : ""}`}  data-tab={index}>
                                <figure>
                                    <Image src={`${API_CAll_Url}/BackEndImage/ServiceImage/${service.ServiceHomeImage}`} alt={service.ServiceNameURL} title={service.ServiceName} width="468" height="362"/>
                                </figure>
                                <figcaption>
                                    <h3>{service.ServiceName}</h3>
                                    {parse(service.ServiceHomeDescription)}
                                    <Link href={`/${service.ServiceNameURL}`} className="btn border-black">Read this service</Link>
                                </figcaption>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    )
}