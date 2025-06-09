"use client";
import { useEffect, useState } from 'react';
import axios from "axios";
import enterView from 'enter-view';
import ProjectListing from '../components/ProjectListing';
import Select from "react-select";
import '../styles/project/project.css';
import '../public/assets/css/animate.css';
import API_url from "../app/API";
import NotFound from "../components/PageNotFound";

const customStyles = {
    control: (base, state) => ({
        ...base,
        width: "100%",
        height: "100%",
        backgroundColor: "none",
        border: "none",
        boxShadow: "none",
        "&:hover": {
            borderColor: "#007bff"
        }
    }),
    valueContainer: (base) => ({
        ...base,
        height: "100%",
    }),
    input: (base) => ({
        ...base,
        width: "100%",
        height: "45px",
        minHeight: "100%",
        minWidth: "100%"
    }),
    placeholder: (base) => ({
        ...base,
        color: "var(--text)",
        fontFamily: "ttrg"
    }),
    option: (base, state) => ({
        ...base,
        width: "100%",
        background: state.isFocused ? "var(--gradient-a)" : "#fff",
        marginBottom: "5px",
        fontSize: "16px",
        padding: "3px 10px",
        color: state.isFocused ? "#fff" : "#000",
        "&:hover": {
            borderColor: "#000",
            color: "#fff"
        }
    }),
    menu: (base) => ({
        ...base,
        zIndex: 10,
        width: "200px"
    }),
    menuList: (base) => ({
    ...base,
        maxHeight: '180px', 
        overflowY: 'auto',    
    }),
    
};

const ProjectListingPage = () => {
    const API_CALL_URL = API_url[0]?.web_url;
    const [pageData, setPageData] = useState({});
    const [projectData, setProjectData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [countryOptions, setCountryOptions] = useState([]);
    const [sectorOptions, setSectorOptions] = useState([]);

    const [selectedCountry, setSelectedCountry] = useState(null);
    const [selectedSector, setSelectedSector] = useState(null);
    const [searchKeyword, setSearchKeyword] = useState("");

    const handleFilter = (projects, country, sector, keyword) => {
        let filtered = [...projects];
        if (country) {
            filtered = filtered.filter(item => item.CountryID === country.value);
        }
        if (sector) {
            filtered = filtered.filter(item => item.SectorID === sector.value);
        }
        if (keyword) {
            const keywordLower = keyword.toLowerCase();
            filtered = filtered.filter(item =>
                item.ProjectName?.toLowerCase().includes(keywordLower) ||
                item.ProjectTagline?.toLowerCase().includes(keywordLower)
            );
        }
        return filtered;
    };

    useEffect(() => {
        if (!API_CALL_URL) return;
        const id = "6";

        axios.get(`${API_CALL_URL}/meta_data/${id}`)
            .then(res => setPageData(res.data.result || {}))
            .catch(console.error);

        axios.get(`${API_CALL_URL}/project_all_data`)
            .then(res => {
                const result = res.data.listingProject || [];
                setProjectData(result);
                setFilteredData(result); // Default view

                // Unique country options
                const uniqueCountries = [...new Map(result.map(item => [item.CountryID, {
                    CountryID: item.CountryID,
                    CountryName: item.CountryName
                }])).values()];
                setCountryOptions(uniqueCountries.map(c => ({ value: c.CountryID, label: c.CountryName })));

                // Unique sector options
                const uniqueSectors = [...new Map(result.map(item => [item.SectorID, {
                    SectorID: item.SectorID,
                    SectorName: item.SectorName
                }])).values()];
                setSectorOptions(uniqueSectors.map(s => ({ value: s.SectorID, label: s.SectorName })));
            })
            .catch(console.error);
    }, []);

    useEffect(() => {
    if (
        typeof window !== "undefined" &&
        window.innerWidth > 1007 &&
        pageData?.StaticPageName // or another check to ensure data is ready
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


    useEffect(() => {
        const filtered = handleFilter(projectData, selectedCountry, selectedSector, searchKeyword);
        setFilteredData(filtered);
    }, [selectedCountry, selectedSector, searchKeyword, projectData]);

    return (
        <main>
            <div className="banner project-banner center-banner">
                <div className="bg">
                    <video playsInline autoPlay muted loop width="100%" height="100%" src={`${API_CALL_URL}/BackEndImage/StaticPageImage/${pageData.StaticPageImage}`}></video>
                    <div className="banner-wrapper">
                        <div className="container">
                            <div className="heading" data-animate="fade-up">
                                <h2>{pageData.StaticPageName}</h2>
                                <p>{pageData.SmallDescription}</p>
                            </div>
                        </div>
                    </div>
                </div>
                {projectData.length > 0 && (
                    <div className="filter-strip">
                        <div className="filters">
                            <Select
                                placeholder="Location"
                                options={countryOptions}
                                onChange={setSelectedCountry}
                                styles={customStyles}
                                components={{ IndicatorSeparator: () => null }}
                                isClearable
                            />
                            <Select
                                placeholder="Sectors"
                                options={sectorOptions}
                                onChange={setSelectedSector}
                                styles={customStyles}
                                components={{ IndicatorSeparator: () => null }}
                                isClearable
                            />
                            <div className="search-input">
                                <input
                                    type="text"
                                    placeholder='Search Keyword'
                                    value={searchKeyword}
                                    onChange={(e) => setSearchKeyword(e.target.value)}
                                />
                                {/* <button className='search'>Search</button> */}
                            </div>
                        </div>
                    </div>
                )}
            </div>
            {filteredData.length > 0 ? (
                <section>
                    <div className="projects-secA sec-pad">
                        <div className="container">
                            <div className="listing-grid">
                                {filteredData.map((project, index) => (
                                    <ProjectListing
                                        key={index}
                                        title={project.ProjectName}
                                        desc={project.ProjectTagline}
                                        url={project.ProjectNameURL}
                                        src={`${API_CALL_URL}/BackEndImage/ProjectImage/${project.ProjectImage}`}
                                        sector={project.SectorName}
                                        sectorsrc={`${API_CALL_URL}/BackEndImage/SectorImage/${project.SectorImage}`}
                                        country={project.CountryID}
                                        sectorID={project.SectorID}
                                    />
                                ))}
                            </div>
                            {filteredData.length > 200 && (
                                <button className='loadBtn'>
                                    <img src="/assets/icon/logo-grad.svg" alt="" />Load more..
                                </button>
                            )}
                        </div>
                    </div>
                </section>
            ) : (
                ""
                // <NotFound title="" desc="Projects not found" />
            )}
        </main>
    );
};

export default ProjectListingPage;