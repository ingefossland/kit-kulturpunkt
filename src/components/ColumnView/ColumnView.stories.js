import React from 'react';

import ViewBase from "../View/ViewBase"
import ViewHeader from "../View/ViewHeader"

import ColumnView from "./ColumnView";
import ColumnViewExample from "./ColumnView.example";

import tree from "./data/tree"

export default {
    title: 'Views/ColumnView',
    component: ColumnView,
    args: {
        items: tree.models
    },
    argTypes: {
    },
};

const Template = (args) => <ViewBase><ViewHeader /><ColumnViewExample {...args} /></ViewBase>

export const Default = Template.bind({});
Default.args = {
    items: tree.models
}
