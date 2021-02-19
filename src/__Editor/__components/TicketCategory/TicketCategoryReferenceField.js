import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux';
import { getModel } from '../../../redux/modelsById/';

import model from "./TicketCategoryReference.model"

const TicketCategoryReferenceField = (props) => {

    const dispatch = useDispatch()

    const modelName = "documents"
    const modelsById = useSelector(state => state.modelsById)
    const uniqueId = props.formData && props.formData.reference && props.formData.reference.uniqueId
    const uniqueModel = modelsById && modelsById[uniqueId] || {}

    const defaultContent = uniqueModel && uniqueModel.content || {}

    const formData = {
        ...props.formData,
        reference: {
            ...props.formData.reference,
            ...uniqueModel
        }
    }

    useEffect(() => {
        if (modelName && uniqueId && !modelsById[uniqueId]) {
            dispatch(getModel({modelName: modelName, uniqueId: uniqueId}))
        }
    }, [uniqueId])

    const uiSchema = {
        ...model.uiSchema,
        ...props.uiSchema,
        "ui:fieldset": [
            "content"
        ],
        "content": {
            "ui:options": {
                "spacing": 2
            },

            "backgroundColor": {
                "ui:placeholder": defaultContent.backgroundColor
            },
            "category": {
                "ui:placeholder": defaultContent.title
            },
            "price": {
                "ui:placeholder": defaultContent.price
            }
        }
    }

    const { ObjectField } = props.registry.fields

    return (
         <ObjectField {...props} formData={formData} uiSchema={uiSchema} />
    )

}


export default TicketCategoryReferenceField