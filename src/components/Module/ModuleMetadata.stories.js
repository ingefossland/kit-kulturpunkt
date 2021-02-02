import React from 'react';
import ModuleMetadata from './ModuleMetadata';

export default {
    title: 'Module/ModuleMetadata',
    component: ModuleMetadata,
    args: {
    },
    argTypes: {
    },
};

const Template = (args) => <ModuleMetadata {...args} />

export const Default = Template.bind({});
Default.args = {
    metadata: ["14kb","400x400"]
}