import React from 'react';
import ViewBase from "./ViewBase";
import ViewHeader from "./ViewHeader";
import ViewPages from "./ViewPages";

import { ListView, ListModule } from "../ListView"

export default {
    title: 'View/ViewPages',
    component: ViewPages,
    args: {
        parents: [
            {
                title: "Parent"
            },
            {
                title: "«query»",
            }
        ],
        description: "Side 1 av 24"
    },
    argTypes: {
    },
};

const Template = (args) => (
    <ViewBase>
        <ViewHeader {...args} />
        <ListView>
            <ListModule title="Item 1" />
            <ListModule title="Item 1" />
            <ListModule title="Item 1" />
            <ListModule title="Item 1" />
            <ListModule title="Item 1" />
            <ListModule title="Item 1" />
            <ListModule title="Item 1" />
            <ListModule title="Item 1" />
            <ListModule title="Item 1" />
            <ListModule title="Item 1" />
        </ListView>
        <ViewPages pages={24} page={1}></ViewPages>
    </ViewBase>
)

export const Default = Template.bind({});
Default.args = {
}