import React from 'react';
import ListSettingsOptions from "./ListSettingsOptions";

export default {
    title: 'Settings/ListSettingsOptions',
    component: ListSettingsOptions,
    args: {
        options: [
            {
                value: "text",
                label: "Text"
            },
            {
                value: "media",
                label: "Media"
            },
            {
                value: "links",
                label: "Lenker"
            },
        ]
    },
    argTypes: {
    },
};

const Template = (args) => <ListSettingsOptions {...args} />

export const Default = Template.bind({});
Default.args = {
}

export const WithIcons = Template.bind({});
WithIcons.args = {
    options: [
        {
            icon: "subject",
            value: "text",
            label: "Text"
        },
        {
            icon: "insert_photo",
            value: "media",
            label: "Media"
        },
        {
            icon: "insert_link",
            value: "links",
            label: "Lenker"
        },

    ]
}