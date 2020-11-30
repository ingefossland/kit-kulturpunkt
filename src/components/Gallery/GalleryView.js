import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ViewHeader, ViewPages } from "../"
import Gallery from "./Gallery"

/** GalleryView */

const GalleryView = ({
    spacing,
    padding,
    isLoading,
    loadingTitle,
    count,
    emptyTitle,
    children,
...props}) => {

    if (isLoading && loadingTitle) {
        return <ViewHeader title={loadingTitle} />
    } else if (!count && emptyTitle) {
        return <ViewHeader title={emptyTitle} />
    }

    return (
        <>
            <ViewHeader {...props} />
            <Gallery spacing={spacing} padding={padding}>
                {children}
            </Gallery>
            <ViewPages {...props} />
        </>
    )    

}


GalleryView.defaultProps = {
    loadingTitle: "Loading ...",
    emptyTitle: "No hits ...",
}

GalleryView.propTypes = {
    spacing: PropTypes.number,
    padding: PropTypes.number,
    isLoading: PropTypes.bool,
    loadingTitle: PropTypes.string,
    emptyTitle: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
}

export default GalleryView;
