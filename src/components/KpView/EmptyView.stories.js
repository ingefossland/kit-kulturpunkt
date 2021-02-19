import React from 'react';
import ViewBase from "./ViewBase";
import ViewHeader from "./ViewHeader";
import EmptyView from "./EmptyView";

export default {
    title: 'View/EmptyView',
    component: EmptyView,
    args: {
        parents: [
            {
                title: "Parent"
            },
            {
                title: "query"
            }
        ]
    },
    argTypes: {
    },
};

const Template = ({parents = [], ...args}) => (
    <ViewBase>
        <ViewHeader parents={parents} />
        <EmptyView {...args} />
    </ViewBase>
)

export const Default = Template.bind({});
Default.args = {
}