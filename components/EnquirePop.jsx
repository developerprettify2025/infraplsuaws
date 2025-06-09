"use client"
import { useEffect, useState } from "react";
import EnquireForm from '../components/EnquireForm';
export default function EnquirePop() {
    
    //const pagename = window.location.href;
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
    }, [])

    const closePop = () => {
        document.querySelector('.enquire-pop').classList.remove('is-open')
        document.querySelector('.overlay').classList.remove('is-open')
        document.querySelector('body').classList.remove('overflow-hidden')
    }
    return (
        <div className="model enquire-pop">
            <button className="close" onClick={closePop}><svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.5 0.5L25.5 25.5M0.5 25.5L25.5 0.5" stroke="black" strokeLinecap="round" strokeLinejoin="round"/></svg></button>
            <div className="model-body">
                <div className="title">
                    <h4>Enquire Now</h4>
                    <p>Waiting for your queries</p>
                </div>
                <EnquireForm className="full_width" pagename="" Type="Quick Enquiry" Sub_type="Quick Enquiry"/>
            </div>
        </div>
    )
}