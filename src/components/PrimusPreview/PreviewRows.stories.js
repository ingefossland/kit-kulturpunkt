import React from 'react';
import PreviewRows from "./PreviewRows";
import person from "./data/person"
import artifact from "./data/artifact"

const items = [artifact,artifact,artifact,artifact,artifact]

export default {
    title: 'Preview/PreviewRows',
    component: PreviewRows,
    args: {
        items: items,
    },
    argTypes: {
    },
};

const Template = (args) => <PreviewRows {...args} />

export const Default = Template.bind({});
Default.args = {
}