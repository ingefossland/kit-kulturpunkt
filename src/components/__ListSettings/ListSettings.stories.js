import React from 'react';
import ListSettings from "./ListSettings";

export default {
    title: 'Settings/ListSettings',
    component: ListSettings,
    args: {
        options: [
            {
                value: "s",
                label: "Small"
            },
            {
                value: "s-m",
                label: "Small/Medium"
            },
            {
                value: "m",
                label: "Medium"
            },
            {
                value: "l",
                label: "Large"
            }                
        ]
    },
    argTypes: {
    },
};

const Template = (args) => <ListSettings {...args} />

export const Default = Template.bind({});
Default.args = {
}