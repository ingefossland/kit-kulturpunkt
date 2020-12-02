import React from 'react';
import NavView from './NavView';

export default {
    title: 'Navigation/NavView',
    component: NavView,
    args: {
    },
    argTypes: {
    },
    
};

const Template = (args) => <NavView {...args} />

export const Default = Template.bind({});
Default.args = {
    options: [
        "list",
        "icons",
        "grid",
        "column",
        "masonry",
        "gallery",
        "details",
        "table",
    ],
    value: "grid"
}

export const WithIcons = Template.bind({});
WithIcons.args = {
    options: [
        {
            title: "Icons",
            value: "icons"
        },
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
