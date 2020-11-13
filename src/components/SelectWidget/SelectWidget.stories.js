import React from 'react';
import Schema from "../SchemaEditor/";

export default {
    title: 'Widgets/SelectWidget',
    component: Schema,
    args: {
        schema: {
            type: "string",
            enum: [
                "one",
                "two",
                "three"
            ]
        },
        uiSchema: {
        }
    },
    argTypes: {
    },
};

const Template = (args) => <Schema {...args} />

export const Default = Template.bind({});
Default.args = {
}

export const WithLabel = Template.bind({});
WithLabel.args = {
    uiSchema: {
        "ui:title": "Title",
        "ui:placeholder": "Select something",
        "ui:help": "Helper text"
    }
}

export const OutlinedVariant = Template.bind({});
OutlinedVariant.args = {
    uiSchema: {
        "ui:title": "Title",
        "ui:variant": "outlined",
        "ui:help": "Helper text"
    }
}


export const StandardVariant = Template.bind({});
StandardVariant.args = {
    uiSchema: {
        "ui:title": "Title",
        "ui:variant": "standard",
        "ui:help": "Helper text"
    }
}


export const StandardNoLabel = Template.bind({});
StandardNoLabel.args = {
    uiSchema: {
        "ui:label": false,
        "ui:title": "Title",
        "ui:variant": "standard",
    }
}