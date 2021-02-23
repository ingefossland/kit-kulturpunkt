import React from 'react';
import ViewHeader from "./ViewHeader";

export default {
    title: 'View/ViewHeader',
    component: ViewHeader,
    args: {
        parents: [
            {
                title: "Parent"
            },
            {
                title: "«query»",
            }
        ],
        description: "No hits"
    },
    argTypes: {
    },
};

const Template = (args) => (
    <ViewHeader {...args} />
)

export const Default = Template.bind({});
Default.args = {
}


export const ViewOptions = Template.bind({});
ViewOptions.args = {
    viewOptions: ["list","grid","table","gallery"]
}

export const SortOptions = Template.bind({});
SortOptions.args = {
    sortOptions: ["alpha","numeric","random"],
    viewOptions: ["list","grid","table","gallery"]
}

export const SizeOptions = Template.bind({});
SizeOptions.args = {
    sortOptions: ["alpha","numeric","random"],
    viewOptions: ["list","grid","table","gallery"],
    sizeOptions: {
        min: 100,
        max: 200
    }
}