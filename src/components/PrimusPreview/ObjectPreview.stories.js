import React from 'react';
import ObjectPreview from "./ObjectPreview";
import data from "./data/artifact"

export default {
    title: 'Preview/ObjectPreview',
    component: ObjectPreview,
    args: data,
    argTypes: {
    },
};

const Template = (args) => <ObjectPreview {...args} />

export const Default = Template.bind({});
Default.args = {
}