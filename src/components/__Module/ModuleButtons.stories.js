import React from 'react';
import ModuleButtons from './ModuleButtons';

export default {
    title: 'Module/ModuleButtons',
    component: ModuleButtons,
    args: {
    },
    argTypes: {
    },
};

const Template = (args) => <ModuleButtons {...args} />

export const Default = Template.bind({});
Default.args = {
    buttons: [
        {
            title: "Button 1",
            disabled: true
        },
        {
            title: "Button 2"
        }
    ]
}