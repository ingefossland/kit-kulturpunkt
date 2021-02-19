import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";

import DocumentPreview from "./DocumentPreview"

import Editor from "./Editor"
import model from "../components/PrimusEditor/Artwork.model"

const DocumentViewer = () => {

    const dispatch = useDispatch()

    const location = useLocation()
    const history = useHistory()
    const pathname = location.pathname

    const app = useSelector(state => state.app)

    const { uniqueId } = useParams()

    const formData = {
        modelName: "documents",
        collectionId: app.collectionId,
        uniqueId: uniqueId
    }

    const _onEdit = () => {
        const editUrl = pathname.replace("/view", "/edit")
        history.push(editUrl)
    }

    // set formContext

    const formContext = {
        primaryAction: {
            type: "edit",
            onClick: _onEdit
        },
        preview: {
            expanded: true,
            template: DocumentPreview
        },
    }
    
    return (
        <Editor {...model} formData={formData} formContext={formContext} />
    )


}

DocumentViewer.defaultProps = {
}

export default DocumentViewer