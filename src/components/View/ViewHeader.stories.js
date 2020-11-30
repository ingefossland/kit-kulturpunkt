import React from 'react';
import ViewHeader from './ViewHeader';

export default {
    title: 'View/ViewHeader',
    component: ViewHeader,
    args: {
        title: "350 treff i dokumenter",
        description: "Side 1 av 3",
    },
    argTypes: {
    },
};

const Template = (args) => <ViewHeader {...args} />

export const Default = Template.bind({});
Default.args = {
}

export const SortOptions = Template.bind({});

SortOptions.args = {
    sortOptions: [
        {
            label: "Alfabetisk",
            value: "a-z"
        },
        {
            label: "Kronologisk",
            value: "1-2"
        }
    ]
}


export const RowsOptions = Template.bind({});

RowsOptions.args = {
    sortOptions: [
        {
            label: "Alfabetisk",
            value: "a-z"
        },
        {
            label: "Kronologisk",
            value: "1-2"
        }
    ],
    rowsOptions: [
        {
            label: "10 treff per side",
            value: 10
        },
        {
            label: "20 treff per side",
            value: 20
        }
    ]
}