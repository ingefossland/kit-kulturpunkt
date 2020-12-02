import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ViewHeader, ViewPages } from "../"
import Gallery from "./Gallery"
import GalleryModule from "./GalleryModule"

/** GalleryView */

const GalleryView = ({
    spacing,
    padding,
    items = undefined,
    children,
...props}) => {

    return (
        <>
            <ViewHeader {...props} />
                <Gallery spacing={spacing} padding={padding}>
                    {items && items.map((item, index) => <GalleryModule {...item} key={index} />) || children }
                </Gallery>
            <ViewPages {...props} />
        </>
    )    

}


GalleryView.defaultProps = {
}

GalleryView.propTypes = {
    spacing: PropTypes.number,
    padding: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    items: PropTypes.array,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
}

export default GalleryView;
