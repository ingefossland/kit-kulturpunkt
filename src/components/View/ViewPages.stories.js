import React from 'react';
import ViewPages from './ViewPages';

export default {
    title: 'View/ViewPages',
    component: ViewPages,
    args: {
        pages: 10,
        page: 3,
    },
    argTypes: {
    },
};

const Template = (args) => <ViewPages {...args} />

export const Default = Template.bind({});
Default.args = {
}

