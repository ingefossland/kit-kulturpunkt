import React from 'react';
import PrimusEditor from "./PrimusEditor";
import LicenseField from "./LicenseField";

export default {
    title: 'uiFields/LicenseField',
    component: LicenseField,
    args: {
        schema: {
            "type": "object",
            "properties": {
                "value": {
                    "type": "string"
                },
                "label": {
                    "type": "string"
                }
            }
        },
        uiSchema: {
            "ui:field": LicenseField
        }
    },
    argTypes: {
    },
};

const Template = (args) => <PrimusEditor {...args} />

export const Default = Template.bind({});
Default.args = {
}
