import '../../styles/home/home.css'
import CareerPage from '../../pages/CareerPage';
import API_url from "../API";
import Canonical_Url from "../Canonical";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  
  const id = "8"    
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
        url: `${Canonical_Call_Url}/career`,
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
        canonical: `${Canonical_Call_Url}/career`,
      },
      icons: {
        icon: "/assets/icon/favicon/favicon.png",
      },
  };
};
async function getJobData() {
  try {    
    const API_CAll_Url = API_url[0].web_url;
    const res = await fetch(`${API_CAll_Url}/career_all_data`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch metadata");  
    const data = await res.json();
    return data.result || {}; // Ensure an empty object if API fails
  } catch (error) {
    console.error("Error fetching metadata:", error);
    return null; // Handle gracefully
  }
}

export default async function Career() {
  // const id = "8";
  // const metaData = await getMetaData(id);
  // const JobData = await getJobData();
  // console.log(JobData);
  return <CareerPage />;
}