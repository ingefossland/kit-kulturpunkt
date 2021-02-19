import React from 'react';
import NavLocale from './NavLocale';

export default {
    title: 'Navigation/NavLocale',
    component: NavLocale,
    args: {
    },
    argTypes: {
    },
};

const Template = (args) => <NavLocale {...args} />

export const Default = Template.bind({});
Default.args = {
    options: [
        "no",
        "en"
    ],
    value: "no"
}