import React from 'react';
import ListSearch from './ListSearch';

export default {
    title: 'List/ListSearch',
    component: ListSearch,
    args: { 
    },
    argTypes: {
    },
};

const Template = (args) => <ListSearch {...args} />

export const Default = Template.bind({});
Default.args = {
}