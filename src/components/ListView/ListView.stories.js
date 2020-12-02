import React from 'react';
import ListView from './ListView';

export default {
    title: 'Views/ListView',
    component: ListView,
    args: {
        items: [
            {
                title: "Item 1"
            },
            {
                title: "Item 2"
            }
        ]        
    },
    argTypes: {
    },
};

const Template = (args) => <ListView {...args} />

export const Default = Template.bind({});
Default.args = {
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

export const IsLoading = Template.bind({});
IsLoading.args = {
    isLoading: true,
    title: "Loading title ...",
    items: undefined
}