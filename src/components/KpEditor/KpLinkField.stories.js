import React from 'react';
import KpEditor from "./KpEditor"
import model from "./KpLink.model"

export default {
    title: 'KpEditor/KpLinkField',
    component: KpEditor,
    args: {
        ...model,
        "formContext": {
            "parents": [
                {
                    "title": "Kp",
                }
            ]
        }
    },
    argTypes: {
    },
};

const Template = (args) => <KpEditor {...args} />

export const Default = Template.bind({});
Default.args = {
}

export const DefaultEmpty = Template.bind({});
DefaultEmpty.args = {
    formData: {}
}

export const Expanded = Template.bind({});
Expanded.args = {
    "uiSchema": {
        "ui:field": "kpLink",
        "ui:expanded": true
    }
}

export const ExpandedMedia = Template.bind({});
ExpandedMedia.args = {
    ...model,
    formData: {
        ...model.formData,
        "media": {
            "imageUrl": "https://dms-test.dimu.org/image/012uPWFDhJNH?mediaType=image/png"
        }
    },
    "uiSchema": {
        "ui:field": "kpLink",
        "ui:expanded": true
    }
}

export const ExpandedEmpty = Template.bind({});
ExpandedEmpty.args = {
    ...model,
    formData: {},
    "uiSchema": {
        "ui:field": "kpLink",
        "ui:expanded": true
    }
}