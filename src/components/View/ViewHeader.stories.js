import React from 'react';
import ViewHeader from "./ViewHeader";

export default {
    title: 'View/ViewHeader',
    component: ViewHeader,
    args: {
    },
    argTypes: {
    },
};

const Template = (args) => (
    <ViewHeader {...args} />
)

export const Default = Template.bind({});
Default.args = {
}