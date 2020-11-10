import React from 'react';
import SectionButtons from './SectionButtons';

export default {
    title: 'Section/SectionButtons',
    component: SectionButtons,
    args: {
    },
    argTypes: {
    },
};

const Template = (args) => <SectionButtons {...args} />

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