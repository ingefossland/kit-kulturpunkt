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
    menu: [
        {
            title: "Gallery"
        },
        {
            title: "Grid"
        },
        {
            title: "List"
        }
    ]
}
