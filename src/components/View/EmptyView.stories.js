import React from 'react';
import ViewBase from "./ViewBase";
import ViewHeader from "./ViewHeader";
import EmptyView from "./EmptyView";

import icons from "../KpIcons/"

export default {
    title: 'View/EmptyView',
    component: EmptyView,
    args: {
        parents: [
            {
                title: "Parent"
            },
            {
                title: "«query»",
            }
        ],
        description: "No hits"
    },
    argTypes: {
    },
};

const Template = ({parents = [], title, description, ...args}) => (
    <ViewBase>
        <ViewHeader parents={parents} title={title} description={description} />
        <EmptyView {...args} />
    </ViewBase>
)

export const Default = Template.bind({});
Default.args = {
}

export const CustomIcon = Template.bind({});
CustomIcon.args = {
    icon: icons["pageAnnotate"],
    message: "Ingen bildekart"
}