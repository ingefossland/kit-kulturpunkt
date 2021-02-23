import React, { useState, useEffect } from 'react';
import PropTypes from "prop-types";
import { makeStyles } from '@material-ui/core/styles';
import { useResizeDetector } from 'react-resize-detector';
import MasonryComponent from 'react-masonry-component';

const useStyles = makeStyles(theme => ({
    wrapper: {
        margin: props => { return props.spacing && theme.spacing(props.spacing * -0.5) },
    },
    masonry: {

        "& > *": {
            width: "auto",
            maxWidth: props => { return props.maxWidth || "auto" },
            margin: props => { return props.spacing && theme.spacing(props.spacing * 0.5) },
        }

    },
}));

const Masonry = ({columnSize = 200, columns = 3, spacing = 1, padding = 0, children, header, footer, debug = false}) => {

    const { width, height, ref } = useResizeDetector()

    if (columnSize && width) {
        columns = Math.floor(width / columnSize)
    }

    const colWidth = (width / columns) - (spacing * 8)
    const maxWidth = colWidth && Math.floor(colWidth)

    const classes = useStyles({padding, spacing, maxWidth});

    // set items width + height for use in gallery

    const imagesLoadedOptions = { background: '.my-bg-image-el' }

    const masonryOptions = {
        transitionDuration: 0
    };

    return (
        <div className={classes.wrapper} ref={ref}>
            <MasonryComponent
                className={classes.masonry} // default ''
    //            elementType={'ul'} // default 'div'
                options={masonryOptions} // default {}
                disableImagesLoaded={false} // default false
                updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
                imagesLoadedOptions={imagesLoadedOptions} // default {}
            >
                {children}
            </MasonryComponent>
        </div>
    );


}

Masonry.propTypes = {
    spacing: PropTypes.number,
    padding: PropTypes.number,
    children: PropTypes.node 
}

export default Masonry;