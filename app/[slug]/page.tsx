import SectorsDetailPage from '../../pages/SectorsDetailPage';
import ProjectDetailPage from '../../pages/ProjectDetailPage';
import ServiceDetailPage from '../../pages/ServiceDetailPage';
import API_url from "../API";
import Canonical_Url from "../Canonical";
import { redirect } from 'next/navigation';
import { Metadata } from "next";

// MetaData interface
interface MetaDataInfo {
    MetaTitle?: string;
    MetaDescriptions?: string;
    MetaKeywords?: string;
    SectorBannerImage?: string;
    ProjectBannerImage?: string;
    ServiceBannerImage?: string;
}

// Metadata generator
export async function generateMetadata({ params }): Promise<Metadata> {
    const API_CALL_URL = API_url[0].web_url;
    const Canonical_Call_Url = Canonical_Url[0].web_url;

    const res = await fetch(`${API_CALL_URL}/api/${params.slug}`, { cache: "no-cache" });
    const data = await res.json();
    const result = data.result;

    let meta: MetaDataInfo | null = null;
    let folder = "";
    let imageKey = "";

    switch (result) {
        case "Sector Page":
            meta = data.data;
            folder = "SectorImage";
            imageKey = "SectorBannerImage";
            break;
        case "Project Page":
            meta = data.data;
            folder = "ProjectImage";
            imageKey = "ProjectBannerImage";
            break;
        case "Service Page":
            meta = data.data;
            folder = "ServiceImage";
            imageKey = "ServiceBannerImage";
            break;
        default:
            redirect('/something-went-wrong');
    }

    if (!meta) {
        redirect('/something-went-wrong');
    }

    const imageFile = meta?.[imageKey as keyof MetaDataInfo];
    const ogImage = imageFile ? `/OGImage/${folder}/${imageFile}` : "/OGImage/infraplus.png";

    return {
        title: meta?.MetaTitle || "InfraPlus",
        description: meta?.MetaDescriptions || "Default description",
        keywords: meta?.MetaKeywords || "default,keywords",
        openGraph: {
            type: "website",
            url: `${Canonical_Call_Url}/${params.slug}`,
            title: meta?.MetaTitle || "InfraPlus",
            description: meta?.MetaDescriptions || "Default description",
            images: [
                {
                    url: ogImage,
                    width: 1200,
                    height: 630,
                    alt: params.slug,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            site: "@InfraPlus",
            title: meta?.MetaTitle || "InfraPlus",
            description: meta?.MetaDescriptions || "Default description",
            images: [ogImage],
        },
        alternates: {
            canonical: `${Canonical_Call_Url}/${params.slug}`,
        },
        icons: {
            icon: "/assets/icon/favicon/favicon.png",
        },
    };
}

// Page Component Loader
export default async function SlugPage({ params }) {
    const API_CALL_URL = API_url[0].web_url;
    const fullUrl = `${API_CALL_URL}/api/${params.slug}`;
    console.log("Fetching metadata from:", fullUrl);

    const res = await fetch(fullUrl, { cache: "no-store" });

    if (!res.ok) {
        const errorText = await res.text();
        console.error("Fetch failed:", res.status, errorText);
        redirect('/something-went-wrong');
    }

    const SlugData = await res.json();

    if (!SlugData || SlugData.result === 'Page Not Found') {
        redirect('/something-went-wrong');
    }

    const { result, data } = SlugData;
    const pageSlug = params.slug;
    switch (result) {
        case "Sector Page":
            return <SectorsDetailPage pageurl={pageSlug}/>;
        case "Project Page":
            return <ProjectDetailPage pageurl={pageSlug}/>;
        case "Service Page":
            return <ServiceDetailPage pageurl={pageSlug}/>;
        default:
            redirect('/something-went-wrong');
    }
}
