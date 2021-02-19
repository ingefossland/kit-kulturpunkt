import React, { useState, useEffect } from "react"
import SelectAdornmentWidget from "./SelectAdornmentWidget"

import { utils } from "@rjsf/core";
const { getUiOptions, getDefaultFormState } = utils

const PlaceRoleField = (props) => {

    const { schema, formData, onChange } = props

    const { StringField } = props.registry.fields

    const _onChange = (status) => {
        onChange({
            ...formData,
            status: status
        })
    
    }

    const uiSchema = {
        ...props.uiSchema.status,
        "ui:title": "Status",
        "ui:widget": SelectAdornmentWidget
    }

    return (
        <StringField {...props}
            schema={schema.properties.status}
            uiSchema={uiSchema}
            formData={formData && formData.status}
            onChange={_onChange}
        />
    )

}

PlaceRoleField.defaultProps = {
    formData: {
        
    }
}

export default PlaceRoleField