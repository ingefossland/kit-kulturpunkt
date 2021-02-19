import React from 'react';
import PrimusFinder from "./PrimusFinder";
import data from "./data/sto.json";

export default {
    title: 'App/PrimusFinder',
    component: PrimusFinder,
    args: {
        ...data
    },
    argTypes: {
    },
};

const Template = (args) => <PrimusFinder {...args} />

export const Default = Template.bind({});
Default.args = {
}