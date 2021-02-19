import React from 'react';
import PrimusEditor from "./PrimusEditor";
import DesignationField from "./DesignationField"
import model from "./Designation.model"

export default {
    title: 'uiFields/DesignationField',
    component: DesignationField,
    args: {
        ...model,
        "uiSchema": {
            "ui:field": DesignationField
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