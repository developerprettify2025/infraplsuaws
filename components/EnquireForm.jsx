import '../styles/components/enquireform.css'
import React, { useState, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import API_url from "../app/API";
import { Input } from "./Input";
import { PageLoader } from "../components/Loader";
import axios from "axios";
import { useRouter } from 'next/navigation';

const EnquireForm = ({ className, buttonType="" , pagename, Type, Sub_type }) => {
    const router = useRouter();
    const API_CAll_Url = API_url[0].web_url;
    const methods = useForm();
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [mounted, setMounted] = useState(false);

    // Ensure code only runs on client
    useEffect(() => {
        setMounted(true);
    }, []);

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
    }, []);

    const onSubmit = methods.handleSubmit(data => {
        if (!mounted) return;
    
        setLoading(true);
        document.querySelector('body').classList.add('over-hidden');
        const url = `${API_CAll_Url}/save_new_enquiry`;
        axios.post(url, data)
            .then((response) => {
                const message = response.data.message;
                const thankYouMessage = "We appreciate you for contacting us. We have taken due note of your query and shall revert back soon.";
                //document.cookie = "allowThankYou=yes; path=/; max-age=60"; // valid for 1 minute
                if (message === thankYouMessage) {
                    //sessionStorage.setItem("thankYouMessage", thankYouMessage);
                    //document.cookie = "allowThankYou=yes; path=/; max-age=60";
                    
                    document.querySelector('.enquire-pop').classList.remove('is-open')
                    document.querySelector('.overlay').classList.remove('is-open')
                    document.querySelector('body').classList.remove('overflow-hidden')
                    setLoading(false);
                    setSuccess(true);
                    setTimeout(() => setSuccess(false), 2000);
                    document.querySelector('body').classList.remove('over-hidden');
                    router.push('/thank-you');
                    //return;
                } else {
                    setSuccess(true);
                    setTimeout(() => setSuccess(false), 2000);
                    methods.reset();
                    setLoading(false);
                    document.querySelector('body').classList.remove('over-hidden');
                }
            })
            .catch((error) => {
                console.error('An error occurred:', error);
                setSuccess(true);
                setTimeout(() => setSuccess(false), 2000);
                methods.reset();
                setLoading(false);
                document.querySelector('body').classList.remove('over-hidden');
            });
    });    

    // Input validation configs...

    const name_validation = {
        name: 'name',
        label: 'Full Name',
        type: 'text',
        id: 'name',
        textbox: "name",
        className: 'form-control',
        validation: {
            required: { value: true, message: 'Name required.' },
            maxLength: { value: 30, message: '30 characters max' },
        },
    };

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
    };

    const phone_validation = {
        name: 'phone',
        label: 'Phone',
        type: 'number',
        id: 'phone',
        textbox: "phone",
        validation: {
            required: "Phone required",
            maxLength: { value: 14, message: 'Invalid Phone No.' },
            minLength: { value: 10, message: 'Invalid Phone No.' },
        },
    };

    const country_validation = {
        name: 'country',
        label: 'Country Name',
        type: 'text',
        id: 'country',
        textbox: "country",
        className: 'form-control',
        validation: {
            required: { value: true, message: 'Country required.' },
            maxLength: { value: 30, message: '30 characters max' },
        },
    };

    const textarea_validation = {
        name: 'message',
        label: 'Message',
        type: 'textarea',
        id: 'message',
        multiline: "textarea",
        validation: {
            required: { value: true, message: 'Message required.' }
        },
    };

    const hiddenFields = [
        {
            name: 'EnquiryType',
            label: 'EnquiryType',
            type: 'hidden',
            id: 'EnquiryType',
            value: Type,
        },
        {
            name: 'EnquiryFor',
            label: 'EnquiryFor',
            type: 'hidden',
            id: 'EnquiryFor',
            value: Sub_type,
        },
        {
            name: 'pageName',
            label: 'pageName',
            type: 'hidden',
            id: 'pageName',
            value: pagename,
        }
    ];

    return (
        <>
            <FormProvider {...methods}>
                <form className={`form form-grid ${className}`} onSubmit={e => e.preventDefault()} noValidate autoComplete="off">
                    <div className="form-group">
                        <Input {...name_validation} />
                    </div>
                    <div className="form-group">
                        <Input {...email_validation} />
                    </div>
                    <div className="form-group">
                        <Input {...phone_validation} />
                    </div>
                    <div className="form-group">
                        <Input {...country_validation} />
                    </div>
                    <div className="form-group full">
                        <Input {...textarea_validation} />
                    </div>
                    <div hidden>
                        {hiddenFields.map((field, index) => (
                            <Input key={index} {...field} />
                        ))}
                    </div>
                    <div className="btn-wrap full">
                        <button className={`btn w-100 ${buttonType}`} onClick={onSubmit}>Submit</button>
                    </div>
                    {success && <div className="messageMail full"><p>We appreciate you for contacting us. We have taken due note of your query and shall revert back soon..</p></div>}
                    {/* <div className="messageMail full"><p>We appreciate you for contacting us. We have taken due note of your query and shall revert back soon..</p></div> */}
                </form>
            </FormProvider>
            {loading && <PageLoader />}
        </>
    );
};
export default EnquireForm;