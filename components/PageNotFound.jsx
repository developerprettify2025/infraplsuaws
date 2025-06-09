import Image from "next/image"
import Link from "next/link"
import '../styles/components/component.css'

export default function PageNotFound({ title, desc }) { 

    return(
        <div className="page-not-found-container mt-hdrfix sec-pad">
            <div className="not-found">
                <Image src="/assets/images/other/not-found.gif" alt="not-found" width={120} height={120}></Image>
                <h3>{title}</h3>
                <p>{desc}</p>
            </div>
        </div>
    )
}