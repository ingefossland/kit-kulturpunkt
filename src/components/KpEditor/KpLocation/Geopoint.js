import React, { useState, useEffect } from 'react';
import GeopointBase from "./GeopointBase"
import GeopointPreview from "./GeopointPreview"
import GeocoderEditor from "./GeopointEditor"

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: "#e5e3df",
        width: "100%",
        position: props => { return props.position },
        flexBasis: props => { return props.minWidth },
        minWidth: props => { return props.minWidth },
        minHeight: props => { return props.minHeight },
    },
}));

const Geopoint = (props) => {
    const { id, position = "relative", minWidth = 164, minHeight = 164, googleMapsApiKey, location } = props;
    const { lat, lng, zoom } = location

    const center = {
        lat: lat,
        lng: lng
    }

    const classes = useStyles({position, minWidth, minHeight})

    const [overlay, setOverlay] = useState(false)

    const _onEdit = () => {
        setOverlay(true)
    }

    const _onClose = () => {
        setOverlay(false)
    }

    return (
        <GeopointBase
            className={classes.root}
            googleMapsApiKey={googleMapsApiKey}>
                <GeopointPreview {...props} onClick={_onEdit} />
                {overlay && <GeocoderEditor {...props} onClose={() => _onClose()} /> }
        </GeopointBase>
    )        
}

Geopoint.defaultProps = {
    googleMapsApiKey: "AIzaSyA0UKwjqalA0BdK5GBh8RPR9HJjtifWLAg",
    location: {
        lat: undefined,
        lng: undefined,
        zoom: undefined
    }
}

export default Geopoint;