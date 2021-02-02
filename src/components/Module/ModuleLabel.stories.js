import React from 'react';
import ModuleLabel from './ModuleLabel';

export default {
    title: 'Module/ModuleLabel',
    component: ModuleLabel,
    args: {
    },
    argTypes: {
    },
};

const Template = (args) => <ModuleLabel {...args} />

export const Default = Template.bind({});
Default.args = {
    label: ["Document"],
}

export const ColouredLabel = Template.bind({});
ColouredLabel.args = {
    label: ["Document"],
    color: "red"
}