import React from 'react';
import NavSort from './NavSort';

export default {
    title: 'Navigation/NavSort',
    component: NavSort,
    args: {
    },
    argTypes: {
    },
    
};

const Template = (args) => <NavSort {...args} />

export const Default = Template.bind({});
Default.args = {
    options: [
        {
            icon: "view_column",
            title: "Gallery",
            value: "gallery"
        },
        {
            icon: "view_module",
            title: "Grid",
            value: "grid"
        },
        {
            icon: "view_headline",
            title: "List",
            value: "list"
        }
    ],
    value: "grid"
}
