import React from 'react';
import { SchemaEditor } from "@kit-ui/schema";
import MeasureField from "./MeasureField"
import model from "./MeasureField.model"

export default {
    title: 'CustomFields/MeasureField',
    component: MeasureField,
    args: {
        ...model,
        "uiSchema": {
            ...model.uiSchema,
            "ui:field": MeasureField
        }
    },
    argTypes: {
    },
};

const Template = (args) => <SchemaEditor {...args} />

export const Default = Template.bind({});
Default.args = {
    formData: "Forside:  12x12x12cm, Bakside: 12x12x12cm, Topp: 12x12x12cm"
}