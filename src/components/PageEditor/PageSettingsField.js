import React, { useState } from 'react'

const PageSettingsField = (props) => {
    const { uiSchema, formData, formContext, registry } = props
    const { dialog } = formContext;

    const newUiSchema = {
        ...uiSchema,
        "ui:layout": "pageSettings",
        "ui:field": undefined
    }

    const { ObjectField } = registry.fields;

    return (
        <ObjectField {...props} uiSchema={newUiSchema} />
    )

}

export default PageSettingsField;