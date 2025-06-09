"use client";
import { useEffect } from "react";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";


export default function ProjectGallery({ zoomImg, mainImg }) {
    useEffect(() => {
        Fancybox.bind("[data-fancybox]", {}); // Initialize Fancybox
    }, []);

    return (
        <div className="pro-col">
            <a href={zoomImg} data-fancybox="gallery">
                <img src={mainImg} alt="Thumbnail" />
            </a>
            <div className="icon">
            </div>
        </div>
    );
}
