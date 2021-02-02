import React from 'react';
import ModuleByline from './ModuleByline';

export default {
    title: 'Module/ModuleByline',
    component: ModuleByline,
    args: {
    },
    argTypes: {
    },
};

const Template = (args) => <ModuleByline {...args} />

export const Default = Template.bind({});
Default.args = {
    datetime: "1999-05-26",
    author: "Ole Gunnar Solskjær"
}