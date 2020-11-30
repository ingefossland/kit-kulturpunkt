import React from 'react';
import ListView from './ListView';

export default {
    title: 'Views/ListView',
    component: ListView,
    args: {
    },
    argTypes: {
    },
};

const ListView = (args) => <ListView {...args} />

export const Default = Template.bind({});
Default.args = {
}