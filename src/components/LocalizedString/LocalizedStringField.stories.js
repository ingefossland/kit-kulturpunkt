import React from 'react';
import LocalizedStringField from "./LocalizedStringField"
import { SchemaEditor as Schema } from "@kit-ui/schema";

export default {
    title: 'Fields/LocalizedStringField',
    component: LocalizedStringField,
    args: {
        formContext: {
            languages: ["no","sv","en"],
            defaultLocale: "no"
        },
        schema: {
            "type": "object",
            "properties": {
                "content": {
                    "type": "localizedString"
                }
            }
        },
        uiSchema: {
            "ui:field": "pageEditor",
            "ui:fieldset": [
                "content"
            ]
        }
    },
    argTypes: {
    },
};

const Template = (args) => <Schema {...args} />

export const Default = Template.bind({});
Default.args = {
}

export const TransformString = Template.bind({});
TransformString.args = {
    formData: {
        "content": "Transform string",
    }
}

export const CustomWidget = Template.bind({});
CustomWidget.args = {
    formData: {
        "locale:no": "Text"
    },
    uiSchema: {
        "ui:widget": "textarea",
        "ui:title": "Textarea",
        "ui:help": "Helper text"
    }
}