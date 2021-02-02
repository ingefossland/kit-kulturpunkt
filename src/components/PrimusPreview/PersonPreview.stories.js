import React from 'react';
import PersonPreview from "./PersonPreview";
import data from "./data/person"

export default {
    title: 'Preview/PersonPreview',
    component: PersonPreview,
    args: data,
    argTypes: {
    },
};

const Template = (args) => <PersonPreview {...args} />

export const Default = Template.bind({});
Default.args = {
}