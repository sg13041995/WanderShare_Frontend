import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from "mapbox-gl";

import 'mapbox-gl/dist/mapbox-gl.css';
import './Map.css';

mapboxgl.accessToken = 'pk.eyJ1IjoiYWNjb3VudGZvcmR1bW15bWVybnByb2plY3QiLCJhIjoiY2t4c21zamQ2MHVjdzJybXAxMzNucXVvdSJ9.4xM2kmxFCHDc3G4Vfm3wuw';

const Map = props => {

    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(props.center.lng.toFixed(4));
    const [lat, setLat] = useState(props.center.lat.toFixed(4));
    const [zoom, setZoom] = useState(props.zoom);

    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lng, lat],
            zoom: zoom
        });
    });

    useEffect(() => {
        if (!map.current) return; // wait for map to initialize
        map.current.on('move', () => {
            setLng(map.current.getCenter().lng.toFixed(4));
            setLat(map.current.getCenter().lat.toFixed(4));
            setZoom(map.current.getZoom().toFixed(2));
        });
    });

    return (
        <div ref={mapContainer} className={`map ${props.className}`} style={props.style}>
            <div className="sidebar">
                Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
            </div>
        </div>
    );
};

export default Map;