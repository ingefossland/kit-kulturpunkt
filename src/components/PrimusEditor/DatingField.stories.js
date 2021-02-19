import React from 'react';
import PrimusEditor from "./PrimusEditor";
import DatingField from "./DatingField"
import model from "./Measure.model"

export default {
    title: 'uiFields/DatingField',
    component: DatingField,
    args: {
        ...model,
        "uiSchema": {
            "ui:field": DatingField
        }
    },
    argTypes: {
    },
};

const Template = (args) => <PrimusEditor {...args} />

export const Default = Template.bind({});
Default.args = {
    formData: {
        value: "1971"
    }
}