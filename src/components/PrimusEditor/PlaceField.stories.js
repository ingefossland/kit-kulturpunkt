import React from 'react';
import PrimusEditor from "./PrimusEditor";
import PlaceField from "./PlaceField"
import model from "./Place.model"

export default {
    title: 'uiFields/PlaceField',
    component: PlaceField,
    args: {
        ...model,
        "uiSchema": {
            "ui:field": PlaceField
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