"use client"
import { useEffect } from "react";
import PageNotFound from "../components/PageNotFound";
const Opps = () => {
    useEffect(() => {
        const header = document.querySelector("header")
        if (header) header.classList.add('header-fit')

        return () => {
            if (header) header.classList.remove("header-fit")
        }
    }, []);
    return (
        <>
            <main>
                <PageNotFound
                    title="Something Went Wrong!"
                    desc="Please get back to homepage"
                />
            </main>
        </>
    )
}
export default Opps;