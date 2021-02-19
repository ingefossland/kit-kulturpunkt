import React from 'react';
import PreviewTheme from "./PreviewTheme";
import PreviewGrid from "./PreviewGrid";
import i1 from "./data/nixons-visions"
import i2 from "./data/the-labours"

const items = [i1,i2,i1,i2,i1,i2]

export default {
    title: 'Preview/PreviewGrid',
    component: PreviewGrid,
    args: {
        items: items,
    },
    argTypes: {
    },
};

const Template = (args) => <PreviewTheme darkMode={args.darkMode}><PreviewGrid {...args} /></PreviewTheme>

export const Default = Template.bind({});
Default.args = {
}

export const DarkMode = Template.bind({});
DarkMode.args = {
    darkMode: true
}