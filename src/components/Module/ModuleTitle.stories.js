import React from 'react';
import ModuleTitle from './ModuleTitle';

export default {
    title: 'Module/ModuleTitle',
    component: ModuleTitle,
    args: {
    },
    argTypes: {
    },
};

const Template = (args) => <ModuleTitle {...args} />

export const Default = Template.bind({});
Default.args = {
    title: "Document title"
}