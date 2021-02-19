import React from 'react';
import PreviewCols from "./PreviewCols";
import person from "./data/person"
import artifact from "./data/nixons-visions"

const items = [artifact]

export default {
    title: 'Preview/PreviewCols',
    component: PreviewCols,
    args: {
        items: items,
    },
    argTypes: {
    },
};

const Template = (args) => <PreviewCols {...args} />

export const Default = Template.bind({});
Default.args = {
}