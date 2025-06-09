import BlogDetailPage from '../../../pages/BlogDetailPage';
import API_url from "../../API";
import Canonical_Url from "../../Canonical";
import { redirect } from 'next/navigation';
import { Metadata } from "next";

// Metadata for SEO
export async function generateMetadata({ params }): Promise<Metadata> {
    const API_CALL_URL = API_url[0].web_url;
    const Canonical_Call_Url = Canonical_Url[0].web_url;

    const res = await fetch(`${API_CALL_URL}/blog_detail/${params.slug}`, {
        cache: "no-cache",
    });

    const data = await res.json();
    const blog = data.result;

    if (!blog) {
        redirect('/something-went-wrong');
    }

    return {
        title: blog.MetaTitle || "InfraPlus",
        description: blog.MetaDescriptions || "Default description",
        keywords: blog.MetaKeywords || "default,keywords",
        openGraph: {
            type: "website",
            url: `${Canonical_Call_Url}/blogs/${params.slug}`,
            title: blog.MetaTitle || "InfraPlus",
            description: blog.MetaDescriptions || "Default description",
            images: [
                {
                    url: `${API_CALL_URL}/BackEndImage/BlogImage/${blog.BlogBannerImage}`,
                    width: 1200,
                    height: 630,
                    alt: params.slug,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            site: "@InfraPlus",
            title: blog.MetaTitle || "InfraPlus",
            description: blog.MetaDescriptions || "Default description",
            images: [`${API_CALL_URL}/BackEndImage/BlogImage/${blog.BlogBannerImage}`],
        },
        alternates: {
            canonical: `${Canonical_Call_Url}/blogs/${params.slug}`,
        },
        icons: {
            icon: "/assets/icon/favicon/favicon.png",
        },
    };
}

// Main Blog Page
export default async function BlogDetail({ params }) {
    return <BlogDetailPage pageurl={params.slug} />;
}
