
"use client"
import BannerWrapper from '../components/BannerWrapper';
import CareerSlider from '../components/CareerSlider';
import CareerAccordion from '../components/CareerAccordion';
import "../styles/career/career.css"
import React, { useState, useEffect } from "react";
import Select from "react-select";
import Image from "next/image";
import { Input } from "../components/Input";
import API_url from "../app/API";
import axios from "axios";
import { FormProvider, useForm} from "react-hook-form";
import enterView from 'enter-view';
import '../public/assets/css/animate.css'
import StaticData from '../public/data/StaticData.json';
import { useRouter } from 'next/navigation';
const customStyles = {
    control: (base, state) => ({
        ...base,
        height: "100%",
        backgroundColor: "none",
        border: state.isFocused ? "none" : "none",
        boxShadow: state.isFocused ? "none" : "none",
        "&:hover": {
          borderColor: "#007bff"
        }
    }),
    valueContainer: (base) => ({
        ...base,
        height: "100%",
      }),
    input: (base, state) => ({
        ...base,
        height: "100%",
        minHeight: "100%",
        minWidth: "100%"
    }),
    placeholder: (base, state) => ({
        ...base,
        color: "var(--text)",
        fontFamily: "ttrg"
    }),
    option: (base, state) => ({
        ...base,
        background: state.isFocused ? "var(--gradient-a)" : "#fff",
        marginBottom: "5px",
        fontSize: "16px",
        padding: "20px 10px",
        color: state.isFocused ? "#fff" : "#000",
        "&:hover": {
          borderColor: "#000",
          color: "#fff"
        }
      }),
    menu: (base) => ({
    ...base,
    zIndex: 100,
    }),
    indicatorsContainer: (base, state) => ({
        ...base,
        padding: state.isFocused ? "0" : "0",
    })
}
const CareerPage = () => {
    const router = useRouter();
    const [pageData, setpageData] = useState([]);
    const [JobData, setJobData] = useState([]);
    useEffect(() => {
        if (!API_CAll_Url) return;
        
        const id = "8";
        axios.get(`${API_CAll_Url}/meta_data/${id}`)
            .then(res => setpageData(res.data.result || {}))
            .catch(console.error);
        
        axios.get(`${API_CAll_Url}/career_all_data`)
            .then(res => setJobData(res.data.result || {}))
            .catch(console.error);

    }, []);
    const WhySection= StaticData.Career.Why;
    const WhySectionItem = StaticData.Career.Why.items;
    const Culture= StaticData.Career.Culture;
    const CultureItem = StaticData.Career.Culture.items;
    const Formdata= StaticData.Career.Formdata;
    const [selectedOption, setSelectedOption] = useState(null)
    const [AttachedFile, setAttachedFile] = useState([]);
    const API_CAll_Url = API_url[0].web_url;
    const methods = useForm();
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    function inputFileUpload(event){
        console.log(event)
        setAttachedFile(event);
    }
    useEffect(()=>{
        //console.log(AttachedFile)
    },[AttachedFile])
    const onSubmit = methods.handleSubmit(data => {
        setLoading(true);    
        document.querySelector('body').classList.add('over-hidden');
        const formData = new FormData();
        formData.append('CareerFullName', data.name);
        formData.append('CareerLastName', data.lastname);
        formData.append('CareerEmailID', data.email);
        formData.append('CareerPhoneNo', data.phone);
        formData.append('CareerMessage', data.message);
        formData.append('CareerResume', AttachedFile); // The uploaded file
        formData.append('hdnJobCategoryName', selectedOption?.value); // Hidden Job Category
    
        const url = `${API_CAll_Url}/save_new_career_enquiry`;
    
        axios.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then((response) => {
            if(response.data.message == "Thank you for reaching out to us! We value your inquiry and want you to know that we’re on it") {
                router.push('/thank-you');
                //return;
            } else {
                setSuccess(true);
                setTimeout(() => setSuccess(false), 2000);
                methods.reset();
                setSelectedOption(null);
                setAttachedFile([]);
                setLoading(false);
                document.querySelector('body').classList.remove('over-hidden');
            }
        })
        .catch((error) => {
            console.log('Error:', error);
            setSuccess(true);
            setTimeout(() => setSuccess(false), 2000);
            methods.reset();
            setSelectedOption(null);
            setAttachedFile([]);
            setLoading(false);
            router.push('/thank-you');
            document.querySelector('body').classList.remove('over-hidden');
        });
    });


    const options = JobData.map(job => ({
        value: job.JobCategoryName,
        label: job.JobCategoryName
    }));
    const name_validation = {
        name: 'name',
        label: 'Full Name',
        type: 'text',
        id: 'name',
        textbox: "name",
        className: 'form-control',
        validation: {
            required: {
                value: true,
                message: 'Name required.',
            },
            maxLength: {
                value: 30,
                message: '30 characters max',
            },
        },
    }
    const lastname_validation = {
        name: 'lastname',
        label: 'Last Name',
        type: 'text',
        id: 'lastname',
        textbox: "lastname",
        className: 'form-control',
        validation: {
            required: {
                value: true,
                message: 'Name required.',
            },
            maxLength: {
                value: 30,
                message: '30 characters max',
            },
        },
    }
    const email_validation = {
        name: 'email',
        label: 'Email',
        type: 'email',
        id: 'email',
        textbox: "email",
        validation: {
            required: "Email required",
            pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Invalid email format!"
            }
        },
    }
    const phone_validation = {
        name: 'phone',
        label: 'phone',
        type: 'number',
        id: 'phone',
        textbox: "phone",
        validation: {
            required: "Phone required",
            maxLength: {
                value: 15,
                message: 'Invalid Phone No.',
            },
            minLength: {
                value: 10,
                message: 'Invalid Phone No.',
            },
        },
    }
    const textarea_validation = {
        name: 'message',
        label: 'Message',
        type: 'textarea',
        id: 'message',
        multiline: "textare",
        validation: {
            required: {
            value: true,
            message: 'Message required.',
            }
        },
    }
    useEffect(() => {
        if (typeof window !== "undefined" && window.innerWidth > 1007){
            enterView({
                selector: '[data-animate]',
                offset: 0,
                enter: (el) =>  {
                    el.classList.add('kmr-animate')
                },
                exit: (el) => {
                    el.classList.remove('kmr-animate');
                }
            })
        }
    });

    useEffect(() =>  {
        const inputBoxes = document.querySelectorAll('.form-control')
        inputBoxes.forEach(inputBox => {
            inputBox.addEventListener('focus', function() {
                this.closest('.form-group')?.classList.add('active')
                this.classList.add('valid')
            })
        })

        return () => {
            inputBoxes.forEach(inputBox => {
                inputBox.removeEventListener('focus', function() {
                    this.closest('.form-group')?.classList.add('active')
                    this.classList.add('valid')
                })
            })
        }
    })

    return (
        <>
            <main>
                <BannerWrapper className="career-banner" mediaType="image" mediaSrc={`https://infraplusadmin.hellopci.com/BackEndImage/StaticPageImage/${pageData.StaticPageImage}`} bannerPosition="center" title={pageData.StaticPageName} desc={pageData.SmallDescription} />
                <section>
                    <div className="career-secA sec-pad">
                        <div className="container over-hidden">
                            <div className="heading text-center" data-animate="fade-up">
                                <h3>{WhySection.heading}</h3>
                                <p>{WhySection.description}</p>
                            </div>
                            {WhySectionItem.length > 0 && (
                                <div className="grid-container" data-animate="zoom-out">
                                    {WhySectionItem.map((whyChoose, index) => (
                                        <div className="career-col" key={index}>
                                            <div className="icon">
                                                <Image src={whyChoose.image} width={44} height={44} alt='why-choose-us' />
                                            </div>
                                            <h6>{whyChoose.heading}</h6>
                                            <p>{whyChoose.description}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </section>
                {CultureItem.length > 0 && (
                    <section>
                        <div className="career-secB sec-pad">
                            <div className="main-container">
                                <div className="heading text-center" data-animate="fade-up">
                                    <h3>{Culture.heading}</h3>
                                </div>
                                <CareerSlider CultureItem={CultureItem} />
                            </div>
                        </div>
                    </section>
                )}
                {JobData.length > 0 && (
                    <>
                        <section>
                            <div className="career-secC sec-pad">
                                <div className="container">
                                    <div className="heading text-center" data-animate="fade-up">
                                        <h3>{Formdata.headingOne}</h3>
                                    </div>
                                    <CareerAccordion JobData={JobData} />
                                </div>
                            </div>
                        </section>
                        <section>
                            <div className="career-secD sec-pad gray-bg">
                                <div className="container">
                                    <div className="heading text-center" data-animate="fade-up">
                                        <h3>{Formdata.headingTwo}</h3>
                                        <p>{Formdata.description}</p>
                                    </div>
                                    <FormProvider {...methods}>
                                        <form className="form-wrap form form-grid" onSubmit={e => e.preventDefault()} noValidate autoComplete="off">
                                            <div>
                                                <Input {...name_validation} />
                                            </div>
                                            <div>
                                                <Input {...lastname_validation} />
                                            </div>
                                            <div>
                                                <Input {...phone_validation} />
                                            </div>
                                            <div>
                                                <Input {...email_validation} />
                                            </div>
                                            <div className="form-group">
                                            <Select 
                                                id="jobid"
                                                placeholder="Apply for"
                                                options={options}
                                                value={selectedOption}
                                                onChange={(option) => setSelectedOption(option)}
                                                styles={customStyles}
                                                components={{
                                                    IndicatorSeparator: () => null 
                                                }}
                                            ></Select>
                                            {selectedOption && <label>{selectedOption.label}</label>}
                                            </div>
                                            <div className="form-group file-input">
                                                <input type="file" accept=".pdf,.docx" onChange={(e)=>setAttachedFile(e.target.files[0])} />
                                                <div className="file-name"></div>
                                            </div>
                                            <div className="form-group full">
                                                <Input {...textarea_validation} />
                                            </div>
                                            <div className="sbmt-grp full text-center">
                                                <button className='btn btn-black btn-wide' onClick={onSubmit}>Submit</button>
                                            </div>
                                            {success && <div className="messageMail full"><p>Thank you for reaching out to us! We value your inquiry and want you to know that we’re on it</p></div>}
                                        </form>
                                    </FormProvider>
                                </div>
                            </div>
                        </section>
                    </>
                )}
            </main>
        </> 
    )
}
export default CareerPage;