import React from 'react';
import PreviewGrid from "./PreviewGrid";
import person from "./data/person"
import artifact from "./data/artifact"

const items = [artifact,artifact,artifact,artifact,artifact]

export default {
    title: 'Preview/PreviewGrid',
    component: PreviewGrid,
    args: {
        items: items,
    },
    argTypes: {
    },
};

const Template = (args) => <PreviewGrid {...args} />

export const Default = Template.bind({});
Default.args = {
}