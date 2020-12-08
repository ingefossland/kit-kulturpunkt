import React, { memo } from 'react';
import { LoadScript } from '@react-google-maps/api';
import GeopointLoader from "./GeopointLoader"
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
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

const GeopointBase = ({className, googleMapsApiKey, children, onClick}) => {
    const classes = useStyles()

    return (
        <div className={className || classes.root} onClick={onClick}>
            <LoadScript
                libraries={["places"]}
                loadingElement={GeopointLoader}
                googleMapsApiKey={googleMapsApiKey}
                preventGoogleFontsLoading={true}>
                    {children}
            </LoadScript>
        </div>
    )        

}

GeopointBase.defaultProps = {
    googleMapsApiKey: "AIzaSyA0UKwjqalA0BdK5GBh8RPR9HJjtifWLAg",
}

export default memo(GeopointBase);