import React from 'react';
import ModuleToolbar from './ModuleToolbar';

export default {
    title: 'Module/ModuleToolbar',
    component: ModuleToolbar,
    args: {
    },
    argTypes: {
    },
};

const Template = (args) => <ModuleToolbar {...args} />

export const Default = Template.bind({});
Default.args = {
    toolbar: [
        {
            icon: "edit"
        },
        {
            icon: "remove_circle"
        },
        {
            icon: "remove_red_eye",
            options: [
                {
                    icon: "add",
                    title: "Add"
                },
                {
                    icon: "remove",
                    title: "Remove"
                },
                {
                    type: "button",
                    variant: "contained",
                    color: "primary",
                    title: "Delete"
                }
            ]
        }
    ]
}