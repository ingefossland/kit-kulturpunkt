import React, { useState } from 'react'

const PageContentField = (props) => {
    const { uiSchema, formContext, registry } = props
    const { dialog, preview } = formContext;

    const newUiSchema = {
        ...uiSchema,
        "ui:dialog": dialog,
        "ui:preview": preview,
        "ui:layout": "pageContent"
    }

    const { ObjectField } = registry.fields;

    return (
        <ObjectField {...props} uiSchema={newUiSchema} />
    )

}

export default PageContentField;