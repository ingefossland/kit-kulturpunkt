import React, { useState, useEffect } from "react"
import SelectAdornmentWidget from "./SelectAdornmentWidget"

import { utils } from "@rjsf/core";
const { getUiOptions, getDefaultFormState } = utils


const PersonRoleField = (props) => {

    const { schema, formData, onChange } = props

    const { StringField } = props.registry.fields

    const _onChange = (role) => {
        onChange({
            ...formData,
            role: role
        })
    
    }

    const uiSchema = {
        ...props.uiSchema.role,
        "ui:title": "Role",
        "ui:widget": SelectAdornmentWidget
    }

    return (
        <StringField {...props}
            schema={schema.properties.role}
            uiSchema={uiSchema}
            formData={formData && formData.role}
            onChange={_onChange}
            />
    )

}

PersonRoleField.defaultProps = {
    formData: {
        
    }
}

export default PersonRoleField