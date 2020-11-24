import React from 'react';
import ModuleLayout from './ModuleLayout';

export default {
    title: 'Module/ModuleLayout',
    component: ModuleLayout,
    args: {
        imageUrl: "https://dms-test.dimu.org/image/012uNXVpKSZo?mediaType=image/png",
        title: "Title",
        description: "description",
        metadata: ["25kb"],
        status: "publish",
        type: "document"
    },
    argTypes: {
    },
};

const Template = (args) => <ModuleLayout {...args} />

export const Default = Template.bind({});
Default.args = {
}

export const Expanded = Template.bind({});
Expanded.args = {
    expanded: true,
    children: <p>children</p>
}

export const Editable = Template.bind({});
Editable.args = {
    editable: true
}

export const EditableExpanded = Template.bind({});
EditableExpanded.args = {
    editable: true,
    expanded: true,
    children: <p>children</p>
}
