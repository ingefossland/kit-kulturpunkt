import React from 'react';
import PrimusEditor from "./PrimusEditor";
import PersonField from "./PersonField"
import model from "./Person.model"

export default {
    title: 'uiFields/PersonField',
    component: PersonField,
    args: {
        ...model,
        "uiSchema": {
            "ui:field": PersonField
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