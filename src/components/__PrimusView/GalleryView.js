import React, { useState, useEffect } from 'react';
import PropTypes from "prop-types";
import { makeStyles } from '@material-ui/core/styles';

import Gallery from "./Gallery"

const useStyles = makeStyles(theme => ({
    view: {
        display: "block",
        padding: theme.spacing(0,2),
    },
}));

const GalleryView = ({mediaSize = 200, spacing = 2, header, footer, children, debug = false}) => {

    const classes = useStyles()

    return (
        <div className={classes.view}>
            <Gallery padding={2} spacing={spacing} mediaSize={mediaSize}>
                {header}
                {children}
                {footer}
            </Gallery>
        </div>        
    )

}

GalleryView.propTypes = {
    spacing: PropTypes.number,
    padding: PropTypes.number,
    children: PropTypes.node 
}

export default GalleryView;