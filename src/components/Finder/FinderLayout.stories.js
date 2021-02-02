import React from 'react';
import FinderLayout from './FinderLayout';

import { getRandomTheme } from ".."

const theme = getRandomTheme()

export default {
    title: 'Components/FinderLayout',
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
