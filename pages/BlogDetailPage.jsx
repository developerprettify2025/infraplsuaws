"use client"
import BannerWrapper from "../components/BannerWrapper";
import BlogDetailsSlider from "../components/BlogDetailsSlider";
import '../styles/sector/sector.css'
import Link from "next/link";
import parse from "html-react-parser";
import enterView from 'enter-view';
import '../public/assets/css/animate.css'
import { useEffect, useState } from "react";
import API_url from "../app/API";
import axios from "axios";
const BlogDetailPage = ({ pageurl }) => {
    const [pageData, setPageData] = useState({});
    const [moreData, setMoreData] = useState([]);
    const [moreSector, setMoreSector] = useState([]);
    const [moreService, setMoreService] = useState([]);
    const API_CALL_URL = API_url[0]?.web_url;
    useEffect(() => {
        if (pageurl) {
            axios.get(`${API_CALL_URL}/blog_detail/${pageurl}`)
                .then(res => {
                    const {
                        result = {},
                        MoreBlog = [],
                        MoreSector = [],
                        MoreService = []
                    } = res.data;

                    setPageData(result);
                    setMoreData(MoreBlog);
                    setMoreSector(MoreSector);
                    setMoreService(MoreService);
                })
                .catch(console.error);
        }
        else{
            redirect('/something-went-wrong');
        }
    }, []);

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (typeof window !== "undefined" && window.innerWidth > 1007) {
                enterView({
                    selector: '[data-animate]',
                    offset: 0,
                    enter: (el) => el.classList.add('kmr-animate'),
                    exit: (el) => el.classList.remove('kmr-animate')
                });
            }
        }, 100); // Delay to ensure DOM is ready
    
        return () => clearTimeout(timeout);
    });
    const formatDate = (dateString) => {
        const months = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        const date = new Date(dateString);
        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();
        return `${day} ${month}, ${year}`;
    };
    return (
        <>
            {pageData?.BlogName && (
                <main>
                    <BannerWrapper
                        className="blog-details-banner"
                        mediaType="image"
                        mediaSrc={`${API_CALL_URL}/BackEndImage/BlogImage/${pageData.BlogBannerImage}`}
                        bannerPosition="left"
                        title={formatDate(pageData.PostedDate)}
                        desc={pageData.BlogName}
                    />
                    {pageData.Description && pageData.Description !== "<p><br></p>" && (
                        <section>
                            <div className="sector-detailA blog-detailsA sec-pad">
                                <div className="container flex over-hidden">
                                    <div className="colA" data-animate="fade-right">
                                        {parse(pageData.Description)}
                                        <button type="button" onClick={() => {
                                            document.querySelector('.enquire-pop').classList.add('is-open')
                                            document.querySelector('.overlay').classList.add('is-open')
                                            document.querySelector('body').classList.add('overflow-hidden')
                                        }} className='btn border-black'>Enquire Now</button>
                                    </div>
                                    {/* <div className="colB" data-animate="fade-left">
                                        {moreSector.length > 0 && (
                                            <>
                                                <h3>Sectors</h3>
                                                <ul>
                                                    {moreSector.map((sector, index) => (
                                                        <li key={`sector-${index}`}>
                                                            <Link href={`/${sector.SectorNameURL}`}>
                                                                <img
                                                                    src={`https://infraplusadmin.hellopci.com/BackEndImage/SectorImage/${sector.SectorImage}`}
                                                                    alt={sector.SectorName || 'Sector'}
                                                                    title={sector.SectorName}
                                                                />
                                                                {sector.SectorName}
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </>
                                        )}
                                        {moreService.length > 0 && (
                                            <>
                                                <h3>Services</h3>
                                                <ul>
                                                    {moreService.map((service, index) => (
                                                        <li key={`service-${index}`}>
                                                            <Link href={`/${service.ServiceNameURL}`}>
                                                                <img
                                                                    src={`https://infraplusadmin.hellopci.com/BackEndImage/ServiceImage/${service.ServiceImage}`}
                                                                    alt={service.ServiceName || 'Service'}
                                                                    title={service.ServiceName}
                                                                />
                                                                {service.ServiceName}
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </>
                                        )}
                                    </div> */}
                                </div>
                            </div>
                        </section>
                    )}
                    {moreData.length > 0 && (
                        <section>
                            <div className="sector-detailB sec-pad">
                                <div className="container">
                                    <div className="heading">
                                        <h3>More Blogs</h3>
                                    </div>
                                    <BlogDetailsSlider MoreBlog={moreData} />
                                </div>
                            </div>
                        </section>
                    )}
                </main>
            )}
        </>
    );
};

export default BlogDetailPage;