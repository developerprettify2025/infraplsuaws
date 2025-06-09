import ServicesListing from '../../pages/ServicesListing';
import StaticData from '../../public/data/StaticData.json';
import API_url from "../API";
import Canonical_Url from "../Canonical";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const id = "5"    
  const API_CAll_Url = API_url[0].web_url;
  const res = await fetch(`${API_CAll_Url}/meta_data/${id}`, {
    cache: "no-cache",
  });
  const data = await res.json();
  const fetchMetaData = data.result;
  const Canonical_Call_Url = Canonical_Url[0].web_url;
  return {
      title: `${fetchMetaData.MetaTitle}`,
      description: `${fetchMetaData.MetaDescriptions}`,
      keywords: `${fetchMetaData.MetaKeywords}`,
      openGraph: {
        type: "website",
        url: `${Canonical_Call_Url}/sectors`,
        title: `${fetchMetaData.MetaTitle}`,
        description: `${fetchMetaData.MetaDescriptions}`,
        images: [
          {
            url: "/OGImage/infraplus.png",
            width: 1200,
            height: 630,
            alt: "InfraPlus Consulting",
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        site: "@InfraPlus",
        title: `${fetchMetaData.MetaTitle}`,
        description: `${fetchMetaData.MetaDescriptions}`,
        images: ["/OGImage/infraplus.png"],
      },
      alternates: {
        canonical: `${Canonical_Call_Url}/sectors`,
      },
      icons: {
        icon: "/assets/icon/favicon/favicon.png",
      },
  };
};

async function getServiceData() {
  try {    
    const API_CAll_Url = API_url[0].web_url;
    const res = await fetch(`${API_CAll_Url}/service_all_data`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch metadata");  
    const data = await res.json();
    return data || {};
  } catch (error) {
    console.error("Error fetching metadata:", error);
    return null; // Handle gracefully
  }
}

export default async function Services() {
    // const id = "5"
    // const metaData = await getMetaData(id);
    // const serviceData = await getServiceData();
    return <ServicesListing/>
}