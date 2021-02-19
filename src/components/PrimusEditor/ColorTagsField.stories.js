import React from 'react';
import PrimusEditor from "./PrimusEditor";
import ColorTags from "./ColorTagsField"
import model from "./Color.model"

export default {
    title: 'uiFields/ColorTags',
    component: ColorTags,
    args: {
        "schema": {
            type: "array",
            items: model.schema,
        },
        "uiSchema": {
            "ui:title": "Farger",
            "ui:field": ColorTags
        }
    },
    argTypes: {
    },
};

const Template = (args) => <PrimusEditor {...args} />

export const Default = Template.bind({});
Default.args = {
    formData: [
        {
            value: "#f00",
            label: "Rød"
        },
        {
            value: "#00f",
            label: "Blå"
        }        
    ]
}