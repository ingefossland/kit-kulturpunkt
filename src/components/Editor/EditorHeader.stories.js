import React from 'react';
import EditorHeader from './EditorHeader';

export default {
  title: 'Components/EditorHeader',
  component: EditorHeader,
  args: {
    },
    argTypes: {
    },
};

const Template = (args) => <EditorHeader {...args} />

export const Default = Template.bind({});
Default.args = {
    title: "Document",
    parents: [
        {
            "title": "Grandparent"
        },
        {
            "title": "Parent"
        }
    ],
    primaryAction: {
        title: "Save"
    },
    status: "draft",
    statusDate: "1999-05-26"
}

export const ParentsUntitled = Template.bind({});
ParentsUntitled.args = {
    untitled: "No title",
    parents: [
        {
            "title": "Grandparent"
        },
        {
            "title": "Parent"
        }
    ]
}

export const ParentsTitle = Template.bind({});
ParentsTitle.args = {
    untitled: "No title",
    title: "Document title",
    parents: [
        {
            "title": "Grandparent"
        },
        {
            "title": "Parent"
        }
    ]
}

export const Collapsible = Template.bind({});
Collapsible.args = {
    untitled: "No title",
    title: "Document title",
    collapsible: true,
    parents: [
        {
            "title": "Grandparent"
        },
        {
            "title": "Parent"
        }
    ]
}


export const CollapsibleExpanded = Template.bind({});
CollapsibleExpanded.args = {
    untitled: "No title",
    title: "Document title",
    collapsible: true,
    expanded: true,
    parents: [
        {
            "title": "Grandparent"
        },
        {
            "title": "Parent"
        }
    ]
}
