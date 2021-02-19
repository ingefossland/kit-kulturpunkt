import React from 'react';
import Loader from './Loader';
import ExampleLoader from './Loader.example';

export default {
    title: 'Loader/Loader',
    component: Loader,
    args: {
        title: "App title",
        description: "Loading text"
    },
    argTypes: {
    }
};

const Template = (args) => <div style={{minHeight: '320px'}}><ExampleLoader {...args}>{JSON.stringify(args)}</ExampleLoader></div>;

export const Default = Template.bind({});
Default.args = {
}
