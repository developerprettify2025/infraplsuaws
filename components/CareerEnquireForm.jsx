import '../styles/components/enquireform.css'
import React, { useState } from "react";
import { FormProvider, useForm} from "react-hook-form";
import API_url from "../app/API";
import { Input } from "./Input";
import { PageLoader } from "../components/Loader";
import { useRouter } from 'next/router';
import Select from "react-select";
import axios from "axios";
const CareerEnquireForm = ({className, pagename, options, Sub_type}) =>{  
    const API_CAll_Url = API_url[0].web_url;
    const methods = useForm();
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const onSubmit = methods.handleSubmit(data => {
        setLoading(true);
        const url = `${API_CAll_Url}/save_new_career_enquiry`;
        axios.post(url, data)
        .then((response) => {
            if(response.data.message == "Thank you for reaching out to us! We value your inquiry and want you to know that we’re on it"){
                sessionStorage.setItem("thankYouMessage", response.data.message); // Store message in session
                router.push("/thank-you"); 
            }
            else{
                setSuccess(true);
                setTimeout(()=>{
                    setSuccess(false);
                },2000);            
                methods.reset();
                setLoading(false)
            }
        })
        .catch((error) => {
            console.log('An error occurred:', error);
            setSuccess(true);
            setTimeout(()=>{
                setSuccess(false);
            },2000);            
            methods.reset();
            setLoading(false)
        });
    });


    const name_validation = {
        name: 'name',
        label: 'Full Name',
        type: 'text',
        id: 'name',
        textbox: "name",
        placeholder: 'Full Name',
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
        placeholder: 'Last Name',
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
        placeholder: 'Email',
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
        placeholder: 'Phone',
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
        placeholder: 'Message',
        validation: {
            required: {
            value: true,
            message: 'Message required.',
            }
        },
    }
    const pageName_validation = {
        name: 'pageName',
        label: 'pageName',
        type: 'hidden',
        id: 'pageName',
        textbox: "pageName",
        placeholder: 'pageName',
        value:pagename,
    }
    return (
        <>
            <FormProvider {...methods}>
                <form className={`form form-grid ${className}`} onSubmit={e => e.preventDefault()} noValidate autoComplete="off">
                    <div className="form-group">
                        <Input {...name_validation} />
                    </div>
                    <div className="form-group">
                        <Input {...lastname_validation} />
                    </div>
                    <div className="form-group">
                        <Input {...phone_validation} />
                    </div>
                    <div className="form-group">
                        <Input {...email_validation} />
                    </div>
                    <div class="form-group">
                        <Select
                            id="jobid"
                            options={options}
                            value={selectedOption}
                            onChange={(option) => setSelectedOption(option)}
                            styles={customStyles}
                        />
                        {selectedOption && <label>{selectedOption.label}</label>}
                    </div>
                    <div className="form-group full">
                        <Input {...textarea_validation} />
                    </div>
                    <div hidden>
                        <Input {...pageName_validation} />
                    </div>
                    <div className="btn-wrap full">
                        <button className='btn w-100' onClick={onSubmit}>Submit</button>
                    </div>
                    {
                        success && (
                            <div className="messageMail"><p>Please try again after sometime.</p></div>
                        )
                    }
                </form>
            </FormProvider>
            {
                loading ? 
                <PageLoader /> 
                : null
            }
        </>
    )
}
export default CareerEnquireForm;