import React from 'react';
import FinderLayout from './FinderLayout';

export default {
    title: 'Finder/FinderLayout',
    component: FinderLayout,
    args: {
    },
    argTypes: {
    },
};

const Template = (args) => <div style={{minHeight: '320px'}}><FinderLayout {...args}>{JSON.stringify(args)}</FinderLayout></div>;

export const Default = Template.bind({});
Default.args = {
}
