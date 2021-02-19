import React, { useState, useEffect } from "react"

import { utils } from "@rjsf/core";
const { getUiOptions, getDefaultFormState } = utils

const MeasureTypeField = (props) => {

    const { schema, formData, onChange } = props

    const { StringField } = props.registry.fields

    const _onChange = (measureType) => {
        onChange({
            ...formData,
            measureType: measureType
        })
    
    }

    const uiSchema = {
        ...props.uiSchema.measureType,
        "ui:title": "Type",
        "ui:widget": "selectAdornment"
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

MeasureTypeField.defaultProps = {
    formData: {
        
    }
}

export default MeasureTypeField