import React from 'react';

import ViewBase from "../View/ViewBase"
import ViewHeader from "../View/ViewHeader"

import TreeView from "./TreeView";
import TreeList from "./TreeList";
import TreeModule from "./TreeModule";
import TreeViewExample from "./TreeView.example";

import tree from "./data/tree"
import icons from "../KpIcons"

export default {
    title: 'Views/TreeView',
    component: TreeView,
    args: {
        parents: [
            {
                title: "Parent"
            }
        ],
        title: "TreeView",
        size: "medium",
        icons: icons,
        items: tree.models
    },
    argTypes: {
        size: {
            control: {
                type: 'radio',
                options: ["small","medium","large"]
            }
        },
    },
};

const Example = ({parents, title, ...args}) => (
    <ViewBase>
        <ViewHeader parents={parents} title={title} />
        <TreeViewExample {...args} />
    </ViewBase>
)

export const ExpandableExample = Example.bind({});
ExpandableExample.args = {
    title: "Expandable tree",
    items: tree.models
}
