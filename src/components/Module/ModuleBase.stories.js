import React from 'react';
import ModuleBase from './ModuleBase';

export default {
    title: 'Module/ModuleBase',
    component: ModuleBase,
    args: {
    },
    argTypes: {
    },
};

const Template = (args) => <ModuleBase {...args}>Content</ModuleBase>

export const Default = Template.bind({});
Default.args = {
}