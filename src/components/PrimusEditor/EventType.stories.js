import React from 'react';
import PrimusEditor from "./PrimusEditor";
import model from "./EventType.model"

export default {
    title: 'uiFields/EventType',
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