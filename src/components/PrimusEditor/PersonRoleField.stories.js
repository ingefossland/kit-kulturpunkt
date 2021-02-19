import React from 'react';
import PrimusEditor from "./PrimusEditor";
import PersonRoleField from "./PersonRoleField"
import model from "./PersonRole.model"

export default {
    title: 'uiFields/PersonRoleField',
    component: PersonRoleField,
    args: {
        ...model,
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