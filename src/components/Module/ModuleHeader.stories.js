import React from 'react';
import ModuleHeader from './ModuleHeader';

export default {
    title: 'Module/ModuleHeader',
    component: ModuleHeader,
    args: {
    },
    argTypes: {
    },
};

const Template = (args) => <ModuleHeader {...args} />

export const WithTitle = Template.bind({});
WithTitle.args = {
    title: "title"
}

export const WithMenu = Template.bind({});
WithMenu.args = {
    menu: [
        {
            label: "Menu 1"
        },
        {
            label: "Menu 2"
        }
    ]
}