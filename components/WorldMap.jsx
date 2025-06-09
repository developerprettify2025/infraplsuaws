import '../styles/components/component.css'

export default function WorldMap() {
    return (
        <div className="global-container">
        <img src="/assets/images/home/map.png" className='map-image' alt="location map" />
        <div className="pointer point1">
            <span>India</span>
        </div>
        <div className="pointer point2">
            <span>asia</span>
        </div>
        <div className="pointer point3">
            <span>Russia</span>
        </div>
        <div className="pointer point4">
            <span>Europe</span>
        </div>
        <div className="pointer point5">
            <span>Africa</span>
        </div>
        <div className="pointer point6">
            <span>South America</span>
        </div>
        <div className="pointer point7">
            <span>North America</span>
        </div>
    </div>
    )
}