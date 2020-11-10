import React from 'react';
import NavSettings from './NavSettings';

export default {
    title: 'Navigation/NavSettings',
    component: NavSettings,
    args: {
    },
    argTypes: {
    },
};

const Template = (args) => <NavSettings {...args} />

export const Default = Template.bind({});
Default.args = {
    settings: [
        {
            template: "grid",
            name: "grid",
            options: [
                "1:1",
                "2:2"
            ]
        },
        {
            template: "color",
            name: "color",
            label: "Red",
            value: "#ff0",
            options: [
                "red",
                "blue"
            ]
        },
        {
            name: "color",
            label: "Red",
            value: "#ff0",
            options: [
                "red",
                "blue"
            ]
        },
        {
            name: "color",
            label: "Red",
            value: "#ff0",
            options: [
                {
                    value: "red"
                },
                {
                    value: "blue"
                },
                {
                    value: "green"
                }
            ]
        }
    ]
}