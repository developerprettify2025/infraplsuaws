
import API_url from "../API";
import Canonical_Url from "../Canonical";
import { Metadata } from "next";
import PrivacyPolicy from '../../pages/PrivacyPolicy';
export async function generateMetadata(): Promise<Metadata> {
    const id = "9"    
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
          url: `${Canonical_Call_Url}/contact-us`,
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
          canonical: `${Canonical_Call_Url}/contact-us`,
        },
        icons: {
          icon: "/assets/icon/favicon/favicon.png",
        },
    };
};
export default function Privacy() {
    return <PrivacyPolicy />;
}