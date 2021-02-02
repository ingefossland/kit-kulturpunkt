import React from 'react';
import KpEditor from "./KpEditor";
import model from "./KpLinksItem.model"

export default {
    title: 'KpEditor/KpLinksItem',
    component: KpEditor,
    args: model,
    argTypes: {
    },
};

const Template = (args) => <KpEditor {...args} />

export const Default = Template.bind({});
Default.args = {
}