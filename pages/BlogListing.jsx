"use client"
import BlogCard from '../components/BlogCard';
import '../styles/blogs/blogs.css'
import Image from "next/image"
import NotFound from "../components/PageNotFound"
import { useEffect, useState } from 'react';
import API_url from "../app/API";
import axios from "axios";
// export default function BlogListing({pageData, BlogData}) {
const BlogListing = () => {
    const [pageData, setpageData] = useState([]);
    const [BlogData, setBlogData] = useState([]);
    useEffect(() => {
        const API_CAll_Url = API_url[0]?.web_url;
        if (!API_CAll_Url) return;
        
        const id = "4";
        axios.get(`${API_CAll_Url}/meta_data/${id}`)
            .then(res => setpageData(res.data.result || {}))
            .catch(console.error);


        axios.get(`${API_CAll_Url}/blogs`)
            .then(res => setBlogData(res.data.result || {}))
            .catch(console.error);

        const header = document.querySelector("header")
        if (header) header.classList.add('header-fit')

        return () => {
            if (header) header.classList.remove("header-fit")
        }
    }, []);
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
            <main>
                <section>
                    <div className="blog-secA mt-hdrfix sec-pad">
                        <div className="container">
                            <div className="heading text-center">
                                <h3>{pageData.StaticPageName}</h3>
                                <p>{pageData.SmallDescription}</p>
                            </div>
                            {BlogData.length > 0 ? (
                                <div className="blogs-container">
                                    {BlogData.map((blog, index) => (
                                        <BlogCard
                                            key={index}
                                            title={blog.BlogName}
                                            URL={blog.BlogNameURL}
                                            Date={formatDate(blog.PostedDate)}
                                            src={blog.BlogImage}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <NotFound title="" desc="Blogs not found"/>
                            )}

                            {BlogData.length > 200 && (
                                <button className="loadBtn">
                                    <Image
                                        alt="infraplus"
                                        width={20}
                                        height={20}
                                        src="/assets/icon/logo-grad.svg"
                                    />
                                    Load more..
                                </button>
                            )}
                        </div>
                    </div>
                </section>
            </main>
        </> 
    )
}
export default BlogListing;