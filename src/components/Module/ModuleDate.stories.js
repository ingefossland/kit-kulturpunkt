import React from 'react';
import ModuleDate from './ModuleDate';

export default {
    title: 'Module/ModuleDate',
    component: ModuleDate,
    args: {
    },
    argTypes: {
    },
};

const Template = (args) => <ModuleDate {...args} />

export const Default = Template.bind({});
Default.args = {
    datetime: "1999-05-26",
}

export const Formatted = Template.bind({});
Formatted.args = {
    datetime: "1999-05-26",
    format: "DD.MM.YYYY"
}