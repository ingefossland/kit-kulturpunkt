import React, { useState } from 'react';
import { GoogleMap } from '@react-google-maps/api';
import ButtonBase from "@material-ui/core/ButtonBase"
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    map: {
        backgroundColor: "#e5e3df",
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        width: "100%",
        height: "100%"
    }
}));

const GeopointMap = ({id = "map", className, center, zoom, onChange, onClick, options, children}) => {
    const [map, setMap] = useState(null) 

    const handleChange = () => {
        map && onChange && onChange(map)
    }

    const classes = useStyles()

    if (onClick) {
        return (
            <GoogleMap
                id={id}
                options={{
                    draggable: false,
                    zoomControl: false,
                    scaleControl: false,
                    mapTypeControl: false,
                    fullscreenControl: false,
                    streetViewControl: false,
                }}
                clickableIcons={false}
                mapContainerClassName={className || classes.map}
                center={center}
                zoom={zoom}
                onClick={onClick}
                onLoad={(map) => setMap(map)}>
                {children}
            </GoogleMap>
        )
    }
    
    return (
        <GoogleMap
            id={id}
            options={options}
            clickableIcons={false}
            mapContainerClassName={className || classes.map}
            center={center}
            zoom={zoom}
            onLoad={(map) => setMap(map)}
            onZoomChanged={handleChange}
            onDragEnd={handleChange}
        >
            {children}
        </GoogleMap>
    )        

}

GeopointMap.defaultProps = {
    options: {
        scaleControl: false,
        draggable: false,
        mapTypeControl: false,
        fullscreenControl: false,
        streetViewControl: false
    },
    center: {
        lat: undefined,
        lng: undefined,
    },
    zoom: 12
}

export default GeopointMap;