import React from 'react';
import PropTypes from 'prop-types';
import Gallery from "../Gallery"
import GalleryModule from "./GalleryModule"

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    view: {
        padding: theme.spacing(0, 2)
    },
}));

/** GalleryView */

const GalleryView = ({
    spacing,
    padding,
    items = undefined,
    maxHeight = 200}) => {

        const classes = useStyles()

    return (
        <div className={classes.view}>
        <Gallery spacing={spacing} padding={padding}>
            {items && items.map((item, index) => {

                let width, height;
                                    
                if (item.mediaWidth && item.mediaHeight) {
                    width = item.mediaWidth
                    height = item.mediaHeight
                } else if (item.imageWidth && item.imageHeight) {
                    width = item.imageWidth
                    height = item.imageHeight
                }

                item = {
                    ...item,
                    width: Math.floor(maxHeight * (width / height)) || maxHeight,
                    maxHeight: maxHeight,
//                    mediaLayout: mediaLayout
                }

                return (
                    <GalleryModule {...item} key={index} />
                )
            
            })}
        </Gallery>
        </div>
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
