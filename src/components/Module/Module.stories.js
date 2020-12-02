import React from 'react';
import Module from './Module';

export default {
    title: 'Module/Module',
    component: Module,
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

const Template = (args) => <Module {...args} />

export const Default = Template.bind({});
Default.args = {
}

export const Elevation = Template.bind({});
Elevation.args = {
    elevation: 1
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
