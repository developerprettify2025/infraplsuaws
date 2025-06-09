"use client";
import Link from "next/link"
import Image from "next/image"
import '../styles/header.css'

import API_url from "../app/API";
import { useEffect, useState  } from "react"
import axios from "axios";
import Hamburger from "./Hamburger";
import EnquirePop from "./EnquirePop";
const Header = () => {
    const [headerData, setheaderData] = useState([]);
    const [SectorData, setSectorData] = useState([]);    
    const API_CAll_Url = API_url[0]?.web_url; 
    useEffect(() => {
        const id = "3";
        axios.get(`${API_CAll_Url}/hearder_meta_data/${id}`)
        .then(res => {
        const { result = [], HeaderSector = []} = res.data;
            setheaderData(result);
            setSectorData(HeaderSector);
        })
        .catch(console.error);
    }, []) 

    useEffect(() => {       

        if (typeof window === "undefined") return;

        const handleScroll = () => {
            const header = document.querySelector("header");
            if (!header) return;
            if (window.scrollY > 100) {
                header.classList.add("header-fixed");
            } else {
                header.classList.remove("header-fixed");
            }
        };
        handleScroll();
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);  
    });

    return(
       <>
         <header>
            <div className="header-wrapper">
                <div className="colA"><Link href="/" className="logo"><img src="/assets/logo.svg" alt="Infraplus logo"></img></Link></div>
                <div className="colB">
                    <ul className="nav-a">
                        {SectorData.length > 0 && (
                            <li className="hasDropdown">
                                <Link href="/sectors" aria-haspopup="true" aria-expanded="false">Sectors</Link>
                                <div className="dropdown-menu" role="menu">
                                    <ul>
                                        {SectorData.map((sector, index) => (
                                            <li key={index}>
                                                <Link href={`/${sector.SectorNameURL || "#"}`}>
                                                    <Image src={`${API_CAll_Url}/BackEndImage/SectorImage/${sector.SectorImage}`} width={20} height={20} alt={sector.SectorNameURL} title={sector.SectorName} />
                                                    {sector.SectorName}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </li>
                        )}
                        <li><Link href="/projects">Projects</Link></li>
                        <li><Link href="/services">Services</Link></li>
                    </ul>
                </div>
                <div className="colC">
                    <ul className="nav-b">
                        <li><Link href="javascript:void(0)"><Image className="svg" width={25} height={25} src="/assets/icon/world.svg" alt="Countries"/>20+ Countries</Link></li>
                        {headerData.MobileNo && (
                            <li>
                                <Link href={`tel:+91${headerData.MobileNo}`}>+91-{headerData.MobileNo}</Link>
                            </li>
                        )}              
                        <li>
                            <button type="button" onClick={() => {
                                document.querySelector('.ham-pop').classList.add('is-open')
                                document.querySelector('.overlay').classList.add('is-open')
                                document.querySelector('body').classList.add('overflow-hidden')
                            }} className="ham-btn" data-model=".ham-pop" aria-label="Open Mobile Menu">
                                <span></span>
                                <span></span>
                                <span></span>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
        <Hamburger hamburgerData={headerData}/>
        <EnquirePop />
       </>
    )
}
export default Header;