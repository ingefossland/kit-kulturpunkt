import React from 'react';
import PrimusEditor from "./PrimusEditor";
import model from "./Event.model"

export default {
    title: 'uiFields/EventField',
    args: {
        ...model
    },
    argTypes: {
    },
};

const Template = (args) => <PrimusEditor {...args} />

export const Default = Template.bind({});
Default.args = {
}