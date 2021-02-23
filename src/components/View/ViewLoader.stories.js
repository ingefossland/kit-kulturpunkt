import React from 'react';
import ViewBase from "./ViewBase";
import ViewHeader from "./ViewHeader";
import ViewLoader from "./ViewLoader";

export default {
    title: 'View/ViewLoader',
    component: ViewLoader,
    args: {
        parents: [
            {
                title: "Parent"
            },
            {
                title: "«query»",
            }
        ],
        description: "Loading ..."
    },
    argTypes: {
    },
};

const Template = (args) => (
    <ViewBase>
        <ViewHeader {...args} />
        <ViewLoader>
            Wrap ViewLoader around a view.
        </ViewLoader>
    </ViewBase>
)

export const Default = Template.bind({});
Default.args = {
}