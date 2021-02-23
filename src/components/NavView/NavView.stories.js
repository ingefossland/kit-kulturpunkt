import React from 'react';
import NavView from "./NavView";

export default {
    title: 'NavView/NavView',
    component: NavView,
    args: {
        viewOptions: ["list","grid"]
    },
    argTypes: {
    },
};

const Template = (args) => (
    <NavView {...args} />
)

export const Default = Template.bind({});
Default.args = {
}


export const ViewOptions = Template.bind({});
ViewOptions.args = {
    viewOptions: ["list","details","grid","icons","table","gallery","masonry"]
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