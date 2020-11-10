import React from 'react';
import Section from './Section';

export default {
    title: 'Section/Section',
    component: Section,
    args: {
        title: "Title",
        description: "description",
    },
    argTypes: {
    },
};

const Template = (args) => <Section {...args}>Content</Section>

export const Default = Template.bind({});
Default.args = {
}

export const ExpandedWithButtons = Template.bind({});
ExpandedWithButtons.args = {
    collsapsible: true,
    expanded: true,
    buttons: [
        {
            label: "Click"
        },
        {
            label: "Dont click",
            disabled: true
        }
    ]
}