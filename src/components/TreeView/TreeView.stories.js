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

const Template = ({parents, title, ...args}) => (
    <ViewBase>
        <ViewHeader parents={parents} title={title} />
        <TreeView>
            <TreeList>
                <TreeModule collapsible expanded icon="bug_report" level={0} title="Parent">
                    <TreeList>
                        <TreeModule collapsible level={1} icon="bug_report" title="Child"></TreeModule>
                        <TreeModule collapsible level={1} icon="bug_report" title="Child"></TreeModule>
                        <TreeModule collapsible expanded level={1} icon="bug_report" title="Child">
                            <TreeList>
                                <TreeModule level={2} icon="bug_report" title="GrandChild"></TreeModule>
                                <TreeModule level={2} icon="bug_report" title="GrandChild"></TreeModule>
                                <TreeModule level={2} icon="bug_report" title="GrandChild"></TreeModule>
                            </TreeList>
                        </TreeModule>
                        <TreeModule level={1} icon="bug_report" title="Child"></TreeModule>
                    </TreeList>
                </TreeModule>
            </TreeList>
        </TreeView>
    </ViewBase>
)


export const Default = Template.bind({});
Default.args = {
}

const Example = ({parents, title, ...args}) => (
    <ViewBase>
        <ViewHeader parents={parents} title={title} />
        <TreeViewExample {...args} />
    </ViewBase>
)

export const ExpandableTree = Example.bind({});
ExpandableTree.args = {
    title: "Expandable tree",
    items: tree.models
}

export const SortableTree = Example.bind({});
SortableTree.args = {
    sortable: true,
    title: "Sortable tree",
    items: tree.models
}
