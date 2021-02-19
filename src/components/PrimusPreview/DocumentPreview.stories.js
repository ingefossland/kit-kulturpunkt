import React from 'react';
import PreviewTheme from "./PreviewTheme";
import DocumentPreview from "./DocumentPreview";
import data from "./data/nixons-visions"

export default {
    title: 'Preview/DocumentPreview',
    component: DocumentPreview,
    args: data,
    argTypes: {
    },
};

const Template = (args) => <PreviewTheme darkMode={args.darkMode}><DocumentPreview {...args} /></PreviewTheme>

export const Default = Template.bind({});
Default.args = {
}

export const DarkMode = Template.bind({});
DarkMode.args = {
    darkMode: true
}