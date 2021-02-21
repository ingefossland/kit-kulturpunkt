import React from 'react';
import KpView from "./KpView";

import search from "./search/page"

export default {
    title: 'View/ViewTypes',
    component: KpView,
    args: {
        ...search,
        items: search.models
    },
    argTypes: {
    },
};

const Template = (args) => <KpView {...args} />

export const List = Template.bind({});
List.args = {
    view: "list"
}

export const Icons = Template.bind({});
Icons.args = {
    view: "icons"
}

export const Masonry = Template.bind({});
Masonry.args = {
    view: "masonry"
}

export const Gallery = Template.bind({});
Gallery.args = {
    view: "gallery"
}