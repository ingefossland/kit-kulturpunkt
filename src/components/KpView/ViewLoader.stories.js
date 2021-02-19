import React from 'react';
import ViewBase from "./ViewBase";
import ViewHeader from "./ViewHeader";
import ViewLoader from "./ViewLoader";

export default {
    title: 'View/ViewLoader',
    component: ViewLoader,
    args: {
    },
    argTypes: {
    },
};

const Template = (args) => (
    <ViewBase>
        <ViewLoader>
            <ViewHeader title="Loading ..." />
        </ViewLoader>
    </ViewBase>
)

export const Default = Template.bind({});
Default.args = {
}