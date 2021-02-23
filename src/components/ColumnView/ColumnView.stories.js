import React from 'react';

import ViewBase from "../View/ViewBase"
import ViewHeader from "../View/ViewHeader"

import ColumnView from "./ColumnView";
import ColumnList from "./ColumnList";
import ColumnModule from "./ColumnModule";

import ColumnViewExample from "./ColumnView.example";

import tree from "./data/tree"
import icons from "../KpIcons"

export default {
    title: 'Views/ColumnView',
    component: ColumnView,
    args: {
        parents: [
            {
                title: "Parent"
            }
        ],
        title: "ColumnView",
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

const Template = ({parents, title, size, ...args}) => (
    <ViewBase>
        <ViewHeader parents={parents} title={title} />
        <ColumnView>
            <ColumnList>
                <ColumnModule size={size} title="Parent 1"></ColumnModule>
                <ColumnModule size={size} title="Parent 2"></ColumnModule>
                <ColumnModule size={size} title="Parent 3" collapsible={true} expanded={true}></ColumnModule>
            </ColumnList>
            <ColumnList elevation={1}>
                <ColumnModule size={size} title="Child 1"></ColumnModule>
                <ColumnModule size={size} title="Child 2" collapsible={true} expanded={true}></ColumnModule>
                <ColumnModule size={size} title="Child 3"></ColumnModule>
                <ColumnModule size={size} title="Child 4"></ColumnModule>
                <ColumnModule size={size} title="Child 5"></ColumnModule>
            </ColumnList>
            <ColumnList elevation={2}>
                <ColumnModule size={size} title="Grandchild 1"></ColumnModule>
                <ColumnModule size={size} title="Grandchild 2"></ColumnModule>
                <ColumnModule size={size} title="Grandchild 3"></ColumnModule>
            </ColumnList>
        </ColumnView>
    </ViewBase>
)


export const Default = Template.bind({});
Default.args = {
    items: tree.models
}


const Example = ({parents, title, ...args}) => (
    <ViewBase>
        <ViewHeader parents={parents} title={title} />
        <ColumnViewExample {...args} />
    </ViewBase>
)

export const ExpandableColumns = Example.bind({});
ExpandableColumns.args = {
    title: "Expandable columns",
    items: tree.models
}

export const SortableColumns = Example.bind({});
SortableColumns.args = {
    sortable: true,
    title: "Sortable columns",
    items: tree.models
}
