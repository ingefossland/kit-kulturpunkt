import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import { PreviewBase, NavPreview } from "../components/"
import { Gallery } from "@kit-ui/admin"

const useStyles = makeStyles(theme => ({
    base: {
        position: "absolute",
        zIndex: 2,
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
    },
}));

const ArtifactPreview = ({formData = [], formContext, mediaHeight = 360}) => {

    const classes = useStyles()

    return (
        <PreviewBase>
            <Gallery width="100%" padding={2} spacing={2}>
                { formData && formData.map((model, index) => {

                    const { mediaId, media } = model;

                    let width, height;
                        
                    if (media.mediaWidth && media.mediaHeight) {
                        width = media.mediaWidth
                        height = media.mediaHeight
                    } else if (media.imageWidth && media.imageHeight) {
                        width = media.imageWidth
                        height = media.imageHeight
                    }

                    width =  Math.floor(mediaHeight * (width / height)) || mediaHeight

                    const { imageUrl } = media

                    return (
                        <img src={imageUrl} width={width} />
                    )

                })}
            </Gallery>
        </PreviewBase>
    )
}

ArtifactPreview.propTypes = {
    formData: PropTypes.object,
}

export default ArtifactPreview;