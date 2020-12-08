import React, { memo } from 'react';
import GeopointBase from "./GeopointBase"
import GeopointMap from "./GeopointMap"
import GeopointMapCenter from "./GeopointMapCenter"
import GeopointSearch from "./GeopointSearch"

import IconButton from "@material-ui/core/IconButton"
import CloseIcon from "@material-ui/icons/Close"

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    geocoder: {
        backgroundColor: "#e5e3df",
        width: "100%",
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
    },
    search: {
        position: "absolute",
        zIndex: 2,
        top: 0,
        right: 0,
        bottom: "auto",
        left: 0,
        margin: theme.spacing(2)
    },
    closeButton: {
        position: "absolute",
        zIndex: 2,
        top: 0,
        right: 0,
        bottom: "auto",
        left: "auto",
        margin: theme.spacing(2)

    }
}));

const Geocoder = ({googleMapsApiKey, location, onChange, onClose}) => {
    const { lat, lng, zoom } = location;

    const handleChange = (location) => {
        onChange && onChange(location)
    }

    const handleMapChange = (map) => {
        console.log('map', map)

        let lat, lng

        if (map && map.center) {
            lat = map.center.lat()
            lng = map.center.lng()
        }
            
        const zoom = map && map.zoom;

        if (lat && lng) {
            handleChange({
                lat: lat,
                lng: lng,
                zoom: zoom
            })
        }

    }

    const handleSearch = (place) => {
        console.log('place', place)

        let lat, lng

        if (place && place.geometry && place.geometry.location) {
            lat = place.geometry.location.lat()
            lng = place.geometry.location.lng()
        }

        if (lat && lng) {
            handleChange({
                placeId: place && place.place_id,
                lat: lat,
                lng: lng,
                zoom: zoom
            })
        }

    }

    const classes = useStyles() 

    const center = {
        lat: lat,
        lng: lng
    }

    return (
        <GeopointBase
            className={classes.root}
            googleMapsApiKey={googleMapsApiKey}>
                <GeopointMap center={center} zoom={zoom} onChange={handleMapChange}>
                    <GeopointMapCenter />
                    <GeopointSearch className={classes.search} onChange={handleSearch} />
                </GeopointMap>

                { onClose && <IconButton className={classes.closeButton} onClick={() => onClose()}>
                    <CloseIcon></CloseIcon>
                </IconButton> }

        </GeopointBase>
    )        
}

Geocoder.defaultProps = {
    googleMapsApiKey: "AIzaSyA0UKwjqalA0BdK5GBh8RPR9HJjtifWLAg",
    location: {
        lat: undefined,
        lng: undefined,
        zoom: undefined
    }
}

export default Geocoder;