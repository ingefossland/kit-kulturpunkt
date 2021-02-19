import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";
import qs from 'query-string';

import DocumentPreview from "./DocumentPreview"

import Editor from "./Editor"
import model from "../components/PrimusEditor/Artwork.model"

const DocumentEditor = () => {

    const dispatch = useDispatch()

    const history = useHistory()
    const location = useLocation()
    const pathname = location.pathname

    const app = useSelector(state => state.app)
    const modelsById = useSelector(state => state.modelsById)

    const { uniqueId } = useParams()

    const sq = location.search && qs.parse(location.search) || {}

    const { documentType } = sq

    let formData = {}

    if (documentType) {
        formData = {
            modelName: "documents",
            documentType: sq.documentType,
            collectionId: app.collectionId,
        }
    } else if (uniqueId) {

        formData = {
            modelName: "documents",
//            documentType: sq.documentType,
            uniqueId: uniqueId
        }
    }

    // set formContext

    const [previewExpanded, setPreviewExpanded] = useState(false)

    const _onExpandPreview = () => {
        setPreviewExpanded(true)
    }

    const _onCollapsePreview = () => {
        setPreviewExpanded(false)
    }

    const _onTogglePreview = () => {
        setPreviewExpanded(expanded => !expanded)
    }

    const preview = {
        template: DocumentPreview,
        expanded: previewExpanded,
        onExpand: _onExpandPreview,
        onCollapse: _onCollapsePreview
    }

    const formContext = {
        languages: app.languages,
        preview: preview,
        onTogglePreview: _onTogglePreview,
        onExpandPreview: _onExpandPreview,
        onCollapsePreview: _onCollapsePreview
    }
    
    return (
        <Editor {...model} formData={formData} formContext={formContext} />
    )


}

DocumentEditor.defaultProps = {
}

export default DocumentEditor