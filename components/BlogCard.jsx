import Link from 'next/link'
import '../styles/components/component.css'
import Image from 'next/image'

export default function BlogCard({ title, URL, Date, src }) {
    return(
        <Link href={`/blogs/${URL}`} className="item item-md blogCard">
            <figure>
                <Image width="417" height="347" src={`https://infraplusadmin.hellopci.com/BackEndImage/BlogImage/${src}`} alt={URL} title={title} />
            </figure>
            <figcaption>
                <h6>{Date}</h6>
                <p>{title}</p>
            </figcaption>
        </Link>
    )
}