import Opps from '../../pages/Opps';
import { Metadata } from "next";
import Canonical_Url from "../Canonical";

// Metadata for SEO
export async function generateMetadata(): Promise<Metadata> {
    const Canonical_Call_Url = Canonical_Url[0].web_url;
    return {
        title: "Something Went Wrong || InfraPlus",
        description: "",
        keywords: "",
        alternates: {
          canonical: `${Canonical_Call_Url}/blogs`,
        },
        icons: {
          icon: "/assets/icon/favicon/favicon.png",
        },
    };
}

export default function SomethingWentWrong() {
    return <Opps />;
}
