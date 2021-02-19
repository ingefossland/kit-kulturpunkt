import React from 'react';
import PrimusEditor from "./PrimusEditor";
import ClassificationField from "./ClassificationField"
import model from "./Classification.model"

export default {
    title: 'uiFields/ClassificationField',
    component: ClassificationField,
    args: {
        ...model,
        "uiSchema": {
            "ui:field": ClassificationField
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