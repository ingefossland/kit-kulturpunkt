import React from 'react';
import EditableSection from './EditableSection';

export default {
    title: 'Section/EditableSection',
    component: EditableSection,
    args: {
        title: "Title",
        description: "description",
    },
    argTypes: {
    },
};

const Template = (args) => <EditableSection {...args}>Content</EditableSection>

export const Default = Template.bind({});
Default.args = {
}

export const Removable = Template.bind({});
Removable.args = {
    removable: true
}

export const RemovableHideable = Template.bind({});
RemovableHideable.args = {
    removable: true,
    hideable: true
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