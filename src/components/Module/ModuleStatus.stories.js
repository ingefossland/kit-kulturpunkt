import React from 'react';
import ModuleStatus from './ModuleStatus';

export default {
    title: 'Module/ModuleStatus',
    component: ModuleStatus,
    args: {
    },
    argTypes: {
    },
};

const Template = (args) => <ModuleStatus {...args} />

export const Default = Template.bind({});
Default.args = {
    status: ["draft"]
}