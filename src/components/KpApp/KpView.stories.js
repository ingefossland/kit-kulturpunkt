import React from 'react';
import KpView from "./KpView";

import tree from "./data/tree"
import pages from "./data/pages"
import media from "./data/media"

export default {
    title: 'KpApp/Views',
    component: KpView,
    args: {
        items: pages.models
    },
    argTypes: {
    },
};

const Template = (args) => <KpView {...args} />

export const ListView = Template.bind({});
ListView.args = {
    view: "list"
}

export const IconsView = Template.bind({});
IconsView.args = {
    view: "icons"
}

export const TableView = Template.bind({});
TableView.args = {
    view: "table"
}

export const MasonryView = Template.bind({});
MasonryView.args = {
    view: "masonry",
    items: media.models
}

export const GalleryView = Template.bind({});
GalleryView.args = {
    view: "gallery",
    items: media.models

}

export const TreeView = Template.bind({});
TreeView.args = {
    view: "tree",
    items: tree.models
}


export const ColumnView = Template.bind({});
ColumnView.args = {
    view: "cols",
    items: tree.models
}