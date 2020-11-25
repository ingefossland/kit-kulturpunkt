import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import { PreviewBase, NavPreview } from "../components/"

import GalleryPreview from "./GalleryPreview"
import MeasurePreview from "./MeasurePreview"

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

const ArtifactPreview = ({formData, formContext}) => {

    const classes = useStyles()

    const currentId = formContext && formContext.currentId
    const currentIds = currentId && currentId.split("_")
    const currentNode = currentIds && currentIds[currentIds.length-1]

    if (!currentId) {
        return (
            <p>No id</p>
        )
    }

    const menu = [
        {
            title: "hello"
        }
    ]

    if (currentId.startsWith("root_content_details")) {
        return (
            <MeasurePreview formData={formData.content.measure} />
        )
    }

    if (currentId.startsWith("root_content_media")) {
        return (
            <GalleryPreview formData={formData.content.images} />
        )
    }

    return (
        <PreviewBase>
            {JSON.stringify(formData)}
            <NavPreview menu={menu} />
        </PreviewBase>
    )
}

ArtifactPreview.propTypes = {
    formData: PropTypes.object,
}

export default ArtifactPreview;