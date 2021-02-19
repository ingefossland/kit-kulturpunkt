import React from 'react';
import PreviewRows from "./PreviewRows";
import person from "./data/person"
import i1 from "./data/nixons-visions"
import i2 from "./data/the-labours"

const items = [i1,i2,i1,i2,i1,i2]

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