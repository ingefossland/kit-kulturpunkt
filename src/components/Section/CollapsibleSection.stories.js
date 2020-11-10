import React from 'react';
import CollapsibleSection from './CollapsibleSection';

export default {
    title: 'Section/CollapsibleSection',
    component: CollapsibleSection,
    args: {
        title: "Title",
        description: "description",
    },
    argTypes: {
    },
};

const Template = (args) => <CollapsibleSection {...args}>Content</CollapsibleSection>

export const Default = Template.bind({});
Default.args = {
}

export const ExpandedWithButtons = Template.bind({});
ExpandedWithButtons.args = {
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