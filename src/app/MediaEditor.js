import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";
import qs from 'query-string';

import DocumentPreview from "./DocumentPreview"

import Editor from "./Editor"

const MediaEditor = () => {

    const dispatch = useDispatch()

    const history = useHistory()
    const location = useLocation()
    const pathname = location.pathname

    const app = useSelector(state => state.app)
    const modelsById = useSelector(state => state.modelsById)

    const { uniqueId } = useParams()

    let formData = {}

    if (uniqueId) {

        formData = {
            modelName: "media",
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
//        template: DocumentPreview,
        expanded: previewExpanded,
        onExpand: _onExpandPreview,
        onCollapse: _onCollapsePreview
    }

    const formContext = {
//        preview: preview,
        onTogglePreview: _onTogglePreview,
        onExpandPreview: _onExpandPreview,
        onCollapsePreview: _onCollapsePreview
    }
    
    return (
        <Editor formData={formData} formContext={formContext} />
    )


}

MediaEditor.defaultProps = {
}

export default MediaEditor