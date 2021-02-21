import React, { useEffect, useState } from "react"
import { SchemaBase } from "@kit-ui/schema"

import registry from "../components/registry"

import Form from "@rjsf/core";

import { getSchemaModel } from "./utils"

const Editor = ({formData, formContext, onChange, onSubmit}) => {

    const { schema, uiSchema } = getSchemaModel(formData)
    
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