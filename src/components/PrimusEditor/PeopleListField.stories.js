import React from 'react';
import { SchemaEditor } from "@kit-ui/schema";
import PeopleListField from "./PeopleListField"
import model from "./Place.model"

export default {
    title: 'uiFields/PeopleListField',
    component: PeopleListField,
    args: {
        "schema": {
            "type": "array",
            "items": model.schema
        },
        "uiSchema": {
            "ui:field": PeopleListField
        },
        "formData": [
            {
                label: "Munch, Edvard"
            },
            {
                label: "Salvesen, Kjartan"
            }
        ]
    },
    argTypes: {
    },
};

const Template = (args) => <SchemaEditor {...args} />

export const Default = Template.bind({});
Default.args = {
}