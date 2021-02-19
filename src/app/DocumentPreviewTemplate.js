import React, { useEffect, useState } from "react"
import DocumentPreview from "../components/PrimusPreview/DocumentPreview"
import EkulturPreview from "../components/PrimusPreview/EkulturPreview"
import KnavPreview from "../components/PrimusPreview/KnavPreview"
import PersonPreview from "../components/PrimusPreview/PersonPreview"

import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { getKulturnav } from '../redux/modelsById';

const templates = {
    "document": DocumentPreview,
    "ekultur": EkulturPreview,
    "knav": KnavPreview,
    "person": PersonPreview,
}

const PreviewTemplate = ({modelName, uniqueId, source, sourceId, ...props}) => {

    const modelsById = useSelector(state => state.modelsById)

    /*

    const dispatch = useDispatch()

    if (source && sourceId) {
        uniqueId = source + "/" + sourceId

        if (!modelsById[uniqueId]) {
            dispatch(getKulturnav({source, sourceId}))
        }

    }

    */

    const uniqueModel = modelsById[uniqueId] || {}
    
    const model = {
        ...uniqueModel,
        ...props
    }

    const { documentType } = model

    let template = templates["document"]

    if (templates[documentType]) {
        template = templates[documentType]
    } else if (source && templates[source]) {
        template = templates[source]
    }

    const Template = template

    return (
        <Template {...model} />
    )

}

export default PreviewTemplate;