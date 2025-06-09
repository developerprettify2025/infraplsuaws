import '../styles/components/component.css'
import Image from 'next/image'
import Link from 'next/link'

export default function ProjectListing({ title, url, desc, sector, sectorsrc, src= "/assets/images/projects/project1.jpg", country, sectorID }) {
    return(
        <div className="item item-md projectCard" title={title} country={country} sector={sectorID}>
            <Link href={`/${url}`}>
                <figure><Image src={src} width={411} height={380} alt={url} title={title}/></figure>
            </Link>
            <figcaption>
                <h6>{title}</h6>
                <p>{desc}</p>
                <Link href={`/${url}`} className='btn'>Explore </Link>
            </figcaption>
            <div className="sector">
                <Image src={sectorsrc} width={30} height={30} alt={sector}/>
                <h6>{sector}</h6>
            </div>
        </div>
    )
}