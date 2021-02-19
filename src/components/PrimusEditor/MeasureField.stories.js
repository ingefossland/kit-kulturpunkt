import React from 'react';
import { SchemaEditor } from "@kit-ui/schema";
import MeasureField from "./MeasureField"
import model from "./Measure.model"

export default {
    title: 'uiFields/MeasureField',
    component: MeasureField,
    args: {
        ...model,
        "uiSchema": {
            "ui:field": MeasureField
        }
    },
    argTypes: {
    },
};

const Template = (args) => <SchemaEditor {...args} />

export const Default = Template.bind({});
Default.args = {
    formData: {
        value: "12x12x12cm"
    }
}