"use client";

export default function Modal({ isOpen, closeModal, className = "", children }) {
    if (!isOpen) return null;

    return (
        
        <div className="overlay is-open" onClick={closeModal}>
            <div className={`model is-open ${className}`} onClick={(e) => e.stopPropagation()}>
                <button className="close" onClick={closeModal}><svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.5 0.5L25.5 25.5M0.5 25.5L25.5 0.5" stroke="black" strokeLinecap="round" strokeLinejoin="round"/></svg></button>
                {children}
            </div>
        </div>
    );
}
