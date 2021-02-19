import React from 'react';

const KpDeviceField = (props) => {
    const { uiSchema, formData, formContext, registry } = props;

    const setStartPageId = (startPageId) => {
        props.onChange({
            ...formData,
            startPageId: startPageId
        })
    }

    const startPageId = formData && formData.startPageId

    const newRegistry = {
        ...registry,
        formContext: {
            ...registry.formContext,
            startPageId: startPageId,
            setStartPageId: setStartPageId
        }
    }

    const newUiSchema = {
        ...uiSchema,
        "ui:dialog": formContext.dialog,
        "ui:preview": formContext.preview,
        "ui:sidebar": {
            ...formContext.dialog,
            ...formContext.sidebar
        },
        "ui:layout": "pageContent",

    }

    const { ObjectField } = registry.fields;

    return (
        <ObjectField {...props} uiSchema={newUiSchema} registry={newRegistry} />
    )


}

export default KpDeviceField