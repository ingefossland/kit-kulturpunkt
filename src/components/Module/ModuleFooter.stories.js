import React from 'react';
import ModuleFooter from './ModuleFooter';
import ModuleButtons from './ModuleButtons';

export default {
    title: 'Module/ModuleFooter',
    component: ModuleFooter,
    args: {
    },
    argTypes: {
    },
};

const Template = (args) => <ModuleFooter {...args} />

export const WithChildren = Template.bind({});
WithChildren.args = {
    children: "Children"
}

export const WithButtons = Template.bind({});
WithButtons.args = {
    children: <ModuleButtons buttons ={[
        {
            title: "Button 1"
        },
        {
            title: "Button 2"
        }
    ]} />
}