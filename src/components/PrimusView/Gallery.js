import React, { useState, useEffect } from 'react';
import PropTypes from "prop-types";
import { makeStyles } from '@material-ui/core/styles';
import { useResizeDetector } from 'react-resize-detector';
import { getGallery } from "./utils/getGallery"

const useStyles = makeStyles(theme => ({
    gallery: {
        display: "flex",
        flexWrap: "wrap",
        margin: props => { return props.spacing && theme.spacing(props.spacing * -0.5) },

        "& > *": {
            margin: props => { return props.spacing && theme.spacing(props.spacing * 0.5) },
        }

    },
}));

const Gallery = ({mediaSize = 200, spacing = 1, padding = 0, children, debug = false}) => {

    const { width, height, ref } = useResizeDetector()


    const maxMediaHeight = mediaSize
    const maxWidth = width - (spacing * 8)
    const gap = spacing * 8

    const classes = useStyles({padding, spacing});

    // set items width + height for use in gallery

    let items = children && React.Children.toArray(children).map((child, index) => {

        const mediaWidth = child.props.mediaWidth * 1 || 1
        const mediaHeight = child.props.mediaHeight * 1 || 1

        const width = Math.floor(maxMediaHeight * (mediaWidth / mediaHeight)) + gap
        const height = maxMediaHeight

        return {
            mediaWidth: mediaWidth,
            mediaHeight: mediaHeight,
            width: width,
            height: height
        }
    })


    // get gallery items based on width + height

    const gallery = items && getGallery({items, maxWidth, gap})
    const galleryChildren = React.Children.toArray(children)

    return (
        <div ref={ref} className={classes.gallery} data-layout="gallery">
            {gallery && gallery.map((item, index) => {

                const { width, height, maxWidth } = item;

                const child = galleryChildren[index]

                if (React.isValidElement(child)) {
                    return React.cloneElement(child, {
                        maxWidth: maxWidth,
                        mediaWidth: width,
                        mediaHeight: height,
                    })
                }

            })}
        </div>        
    )

}

Gallery.propTypes = {
    spacing: PropTypes.number,
    padding: PropTypes.number,
    children: PropTypes.node 
}

export default Gallery;