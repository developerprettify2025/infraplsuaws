"use client";
import { useRouter } from 'next/navigation';
import RelatedProject from '../components/RelatedProject';
import EnquireForm from '../components/EnquireForm';
import FAQAccordion from "../components/FaqAccordion";
import '../styles/sector/sector.css';
import BannerWrapper from '../components/BannerWrapper';
import Link from "next/link";
import parse from "html-react-parser";
import enterView from 'enter-view';
import '../public/assets/css/animate.css';
import { useEffect, useState } from "react";
import API_url from "../app/API";
import axios from "axios";

const ServiceDetailPage = ({ pageurl }) => {
    const router = useRouter();
    const [pageData, setPageData] = useState({});
    const [moreData, setMoreData] = useState([]);
    const [relatedProjects, setRelatedProjects] = useState([]);
    const [faqData, setFaqData] = useState([]);

    const API_CALL_URL = API_url[0]?.web_url;
    const [activeTab, setActiveTab] = useState(pageurl);

    useEffect(() => {
        if (!pageurl) {
            router.push('/something-went-wrong');
            return;
        }

        axios.get(`${API_CALL_URL}/api/${pageurl}`)
            .then(res => {
                const {
                    data = {},
                    more = [],
                    relatedProjects = [],
                    projectGallery = [],
                    faq = []
                } = res.data;
                setPageData(data);
                setMoreData(more);
                setRelatedProjects(relatedProjects);
                setFaqData(faq);
            })
            .catch(err => {
                console.error(err);
                router.push('/something-went-wrong');
            });
    }, []);

    const openPop = () => {
        document.querySelector('.enquire-pop')?.classList.add('is-open');
        document.querySelector('.overlay')?.classList.add('is-open');
        document.querySelector('body')?.classList.add('overflow-hidden');
    };
    useEffect(() => {
        if (
            typeof window !== "undefined" &&
            window.innerWidth > 1007 &&
            pageData?.ServiceName 
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
            {pageData?.ServiceName && (
                <main>
                     <BannerWrapper
                        className="serviceDetails-banner"
                        mediaType="image"
                        mediaSrc={`${API_CALL_URL}/BackEndImage/ServiceImage/${pageData.ServiceBannerImage}`}
                        bannerPosition="center"
                        title={pageData.ServiceName}
                        desc={pageData.ServiceTagline}
                    />
                    {pageData.Description && pageData.Description !== "<p><br></p>" && (
                        <section>
                            <div className="sector-detailA service-detailA sec-pad">
                                <div className="container flex over-hidden">
                                    <div className="colA" data-animate="fade-right">
                                        {parse(pageData.Description)}
                                    </div>
                                    <div className="colB" data-animate="fade-left">
                                        <div className="form-wrapper">
                                            <div className="title">
                                                <h6>Talk to Our Experts</h6>
                                            </div>
                                            <EnquireForm
                                                className="service-details-form"
                                                Type="Sector Enquiry"
                                                Sub_type={pageData.ServiceName}
                                            />
                                        </div>

                                        {moreData.length > 0 && (
                                            <>
                                                <h3>More Services</h3>
                                                <ul>
                                                    {moreData.map((service, index) => (
                                                        <li key={index} className={activeTab === service.ServiceNameURL ? "active" : ""}>
                                                            <Link href={`/${service.ServiceNameURL}`}>
                                                                <img
                                                                    src={`https://infraplusadmin.hellopci.com/BackEndImage/ServiceImage/${service.ServiceImage}`}
                                                                    alt={service.ServiceName}
                                                                    title={service.ServiceName}
                                                                />
                                                                {service.ServiceName}
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
                    )}

                    {faqData.length > 0 && (
                        <section>
                            <div className="service-detailB gray-bg sec-pad">
                                <div className="container">
                                    <div className="heading text-center" data-animate="fade-up">
                                        <h3>Frequently asked questions</h3>
                                    </div>
                                    <FAQAccordion faqs={faqData} />
                                </div>
                            </div>
                        </section>
                    )}

                    {relatedProjects.length > 0 && (
                        <section>
                            <div className="sector-detailB sec-pad">
                                <div className="container">
                                    <div className="heading">
                                        <h3>Projects Completed</h3>
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
export default ServiceDetailPage;