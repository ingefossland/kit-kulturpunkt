import React from 'react';
import SortableTree from './SortableTree';

import documentTree from "./documentTree.json"

export default {
    title: 'Layout/SortableTree',
    component: SortableTree,
    args: {
    },
    argTypes: {
    },
    
};

const Template = (args) => <SortableTree {...args}></SortableTree>;

export const Default = Template.bind({});
Default.args = {
    pathname: "/kp/b265d040-bef7-4e4d-9b9e-9ecb7e7fee41/c82d5e97-95b2-4565-8d78-84b7a08546c7/71dffde7-1c98-4da5-a668-b1f9388dd7e1",
    parents: documentTree
}
