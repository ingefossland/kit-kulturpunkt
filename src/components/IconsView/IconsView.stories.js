import React from 'react';
import IconsView from './IconsView';

export default {
    title: 'Views/IconsView',
    component: IconsView,
    args: {
        items: [
            {
                icon: "apps",
                title: "Item 1"
            },
            {
                icon: "bug_report",
                title: "Item 2"
            }
        ]        
    },
    argTypes: {
    },
};

const Template = (args) => <IconsView {...args} />

export const Default = Template.bind({});
Default.args = {
}

export const IsLoading = Template.bind({});
IsLoading.args = {
    isLoading: true,
    title: "Loading title ...",
    items: undefined
}

export const WithOptions = Template.bind({});
WithOptions.args = {
    title: "300 hits",
    description: "Page 1 of 4",
    sortOptions: [
        "alfa",
        "numeric"
    ],
    rowsOptions: [
        10,
        20,
        30
    ],
    pages: 4,
    page: 1
}