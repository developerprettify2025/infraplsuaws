
"use client"
import '../styles/contact/contact.css'
import parse from "html-react-parser";
import { useEffect, useState } from "react";
import '../public/assets/css/animate.css'
import API_url from "../app/API";
import axios from "axios";
import StaticData from '../public/data/StaticData.json';
const PrivacyPolicy = () => {
    const PrivacyPolicyData= StaticData.PrivacyPolicy.data;
    const [pageData, setpageData] = useState([]);
    const API_CAll_Url = API_url[0]?.web_url; 
    useEffect(() => {
        const id = "9";
        axios.get(`${API_CAll_Url}/meta_data/${id}`)
            .then(res => setpageData(res.data.result || {}))
            .catch(console.error);
    }, []);
    useEffect(() => {
        const header = document.querySelector("header")
        if (header) header.classList.add('header-fit')

        return () => {
            if (header) header.classList.remove("header-fit")
        }
    })
    return (
        <>
            <div className="privacy-secA sec-pad mt-hdrfix">
                <div className="container">
                    <div className="website-content">
                        <h1>{pageData.SmallDescription}</h1>
                        {pageData.Description && pageData.Description !== "<p><br></p>" && (
                            <>
                                {parse(pageData.Description)}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </> 
    )
}
export default PrivacyPolicy;