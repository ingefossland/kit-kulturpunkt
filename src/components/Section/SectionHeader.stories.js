import React from 'react';
import SectionHeader from './SectionHeader';

export default {
    title: 'Section/SectionHeader',
    component: SectionHeader,
    args: {
        title: "Title",
        description: "description",
    },
    argTypes: {
    },
};

const Template = (args) => <SectionHeader {...args} />

export const Default = Template.bind({});
Default.args = {
}


export const LongDescription = Template.bind({});
LongDescription.args = {
    title: "title",
    description: "Long description should be cut lorem ipsum dolor sit amet consecteteur adipiscing elit",
    settings: [
        {
            template: "color"
        },
    ]
}
export const WithSettings = Template.bind({});
WithSettings.args = {
    settings: [
        {
            template: "color"
        },
    ]
}