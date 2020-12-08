import React, { memo, useEffect } from 'react';
import GeopointMap from "./GeopointMap"
import GeopointMapCenter from "./GeopointMapCenter"
import GeopointSearch from "./GeopointSearch"

import IconButton from "@material-ui/core/IconButton"
import CloseIcon from "@material-ui/icons/Close"

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    overlay: {
        position: "fixed",
        backgroundColor: "rgba(0,0,0,.25)",
        zIndex: 2000,
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    },
    geocoder: {
        backgroundColor: "#e5e3df",
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        margin: theme.spacing(4)
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
        margin: theme.spacing(2.5)

    }
}));

const GeocoderOverlay = ({id = "map", location, onChange, onClose}) => {
    const { lat, lng, zoom } = location;

    const _onChange = (location) => {
        onChange && onChange(location)
    }

    const _onMapChange = (map) => {
        console.log('map', map)

        let lat, lng

        if (map && map.center) {
            lat = map.center.lat()
            lng = map.center.lng()
        }
            
        const zoom = map && map.zoom;

        if (lat && lng) {
            _onChange({
                lat: lat,
                lng: lng,
                zoom: zoom
            })
        }

    }

    const _onSearch = (place) => {
        console.log('place', place)

        let lat, lng

        if (place && place.geometry && place.geometry.location) {
            lat = place.geometry.location.lat()
            lng = place.geometry.location.lng()
        }

        if (lat && lng) {
            _onChange({
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
        <div className={classes.overlay}>
            <div className={classes.geocoder}>
                <GeopointMap id={id + "-editor"} center={center} zoom={zoom} onChange={_onMapChange}>
                    <GeopointMapCenter />
                    <GeopointSearch className={classes.search} onChange={_onSearch} />
                </GeopointMap>

                <IconButton className={classes.closeButton} onClick={() => onClose()}>
                    <CloseIcon></CloseIcon>
                </IconButton>
            </div>
        </div>
    )        
}

GeocoderOverlay.defaultProps = {
    formData: {
        lat: undefined,
        lng: undefined,
        zoom: undefined
    }
}

export default GeocoderOverlay;