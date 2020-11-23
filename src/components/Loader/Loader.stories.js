import React from 'react';
import Loader from './Loader';
import LoaderExample from './Loader.example';

export default {
    title: 'App/Loader',
    component: Loader,
    args: {
        title: "App title",
        description: "Loading text"
    },
    argTypes: {
    }
};

const Template = (args) => <div style={{minHeight: '320px'}}><AppLoaderExample {...args}>{JSON.stringify(args)}</AppLoaderExample></div>;

export const Default = Template.bind({});
Default.args = {
}
