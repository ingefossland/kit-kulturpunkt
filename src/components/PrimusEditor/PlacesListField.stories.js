import React from 'react';
import PrimusEditor from "./PrimusEditor";
import PlacesListField from "./PlacesListField"
import model from "./Place.model"

export default {
    title: 'uiFields/PlacesListField',
    component: PlacesListField,
    args: {
        "schema": {
            "type": "array",
            "items": model.schema
        },
        "uiSchema": {
            "ui:field": PlacesListField
        },
        "formData": [
            {
                label: "Oslo"
            },
            {
                label: "Bergen"
            },
            {
                label: "Trondheim"
            }
        ]
    },
    argTypes: {
    },
};

const Template = (args) => <PrimusEditor {...args} />

export const Default = Template.bind({});
Default.args = {
}