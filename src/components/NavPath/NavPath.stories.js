import React from 'react';
import NavPath from "./NavPath";


export default {
    title: 'Navigation/NavPath',
    component: NavPath,
    args: {
        parents: [
            {
                title: "Grandparent"
            },
            {
                title: "Parent"
            }
        ]
    },
    argTypes: {
    },
};

const Template = (args) => <NavPath {...args} />

export const Default = Template.bind({});
Default.args = {
}

export const WithTitle = Template.bind({});
WithTitle.args = {
    title: "Title"
}

export const WithDescription = Template.bind({});
WithDescription.args = {
    title: "Title",
    description: "13 hits"
}
