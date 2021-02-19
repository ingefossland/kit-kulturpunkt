import React from 'react';
import PrimusEditor from "./PrimusEditor";
import TechniqueField from "./TechniqueField"
import model from "./Technique.model"

export default {
    title: 'uiFields/TechniqueField',
    component: TechniqueField,
    args: {
        ...model,
        "uiSchema": {
            "ui:field": TechniqueField
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