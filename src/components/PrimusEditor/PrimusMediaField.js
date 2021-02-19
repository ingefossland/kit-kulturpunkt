import React, { useState, useEffect } from "react"
import PrimusMediaEditorField from "../PrimusMedia/PrimusMediaEditorField"
import { utils } from "@rjsf/core";
const { getUiOptions, getDefaultFormState, toIdSchema } = utils

const PrimusMediaField = (props) => {
    const { formData, formContext, onChange } = props


    let uiSchema = {
        ...props.uiSchema,
        "ui:layout": "primusMedia"
    }

    const id = props.idSchema.$id
    const currentId = formContext.currentId

    if (currentId && currentId.includes("_images")) {
        return <PrimusMediaEditorField {...props} />
    }

    const { ObjectField } = props.registry.fields

    return (
        <ObjectField {...props} uiSchema={uiSchema} />
    )



}

export default PrimusMediaField