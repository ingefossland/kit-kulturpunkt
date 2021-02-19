import React from 'react';
import ListView from "./ListView";

export default {
    title: 'View/ListView',
    component: ListView,
    args: {
        items: [
            {
                title: "Item 1"
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