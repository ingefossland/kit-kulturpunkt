import React, { useEffect, useState } from "react"
import { SchemaBase } from "@kit-ui/schema"

import registry from "../components/registry"

import Form from "@rjsf/core";

import { schemasByName } from "./schemas"


const Editor = ({formData, formContext, onChange, onSubmit}) => {


    // get model

    const { documentType, mediaType, collectionType } = formData

    const documentModel = documentType && schemasByName && schemasByName["documents/" + documentType]
    const mediaModel = mediaType && schemasByName && schemasByName["media/" + mediaType]
    const collectionModel = collectionType && schemasByName && schemasByName["collections/" + collectionType]
    
    const model = documentModel || mediaModel || collectionModel || {}

    // get schema + uiSchema

    const { schema, uiSchema } = model
    
    return (
        <SchemaBase
            {...registry}
            schema={schema}
            uiSchema={uiSchema}
            formData={formData}
            formContext={formContext}
            onChange={onChange}
            onSubmit={onSubmit}
            />
    )

    return (
        <Form
            {...registry}
            schema={schema}
            uiSchema={uiSchema}
            formData={formData}
            formContext={formContext}
            onChange={onChange}
            onSubmit={onSubmit}
            />
    )
    

}

export default Editor;