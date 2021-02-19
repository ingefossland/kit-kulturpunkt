import React from 'react';
import PrimusEditor from "./PrimusEditor";
import MaterialField from "./MaterialField"
import model from "./Material.model"

export default {
    title: 'uiFields/MaterialField',
    component: MaterialField,
    args: {
        ...model,
        "uiSchema": {
            "ui:field": MaterialField
        }
    },
    argTypes: {
    },
};

const Template = (args) => <PrimusEditor {...args} />

export const Default = Template.bind({});
Default.args = {
    formData: {
        value: ""
    }
}