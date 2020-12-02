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

export const Collapsible = Template.bind({});
Collapsible.args = {
    collapsible: true,
    expanded: false
}

export const CollapsibleExpanded = Template.bind({});
CollapsibleExpanded.args = {
    collapsible: true,
    expanded: true
}

export const Editable = Template.bind({});
Editable.args = {
    editable: true,
    expanded: false,
}

export const EditableExpanded = Template.bind({});
EditableExpanded.args = {
    editable: true,
    expanded: true,
    buttons: [
        {
            title: "Click"
        },
        {
            title: "Dont click",
            disabled: true
        }
    ]
}