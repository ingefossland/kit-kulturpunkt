import React from 'react';
import DocumentTree from './DocumentTree';
import DocumentTreeSection from './DocumentTreeColumn';
import DocumentTreeParent from './DocumentTreeParent';
import DocumentInspector from './DocumentInspector';

import document from "./document"

export default {
    title: 'Layout/DocumentTree',
    component: DocumentTree,
    args: {
    },
    argTypes: {
    },
    
};

const Template = (args) => <DocumentTree {...args}>
    <DocumentTreeSection expanded={true}>
        <DocumentTreeParent children={true} selected={true} title="Parent 1" documentType="page"></DocumentTreeParent>
        <DocumentTreeParent children={true} title="Parent 2" documentType="page"></DocumentTreeParent>
    </DocumentTreeSection>
    <DocumentTreeSection expanded={true}>
        <DocumentTreeParent children={true} title="Child 1" documentType="page"></DocumentTreeParent>
        <DocumentTreeParent children={true} selected={true} title="Child 2" documentType="page"></DocumentTreeParent>
        <DocumentTreeParent children={true} title="Child 3" documentType="page"></DocumentTreeParent>
        <DocumentTreeParent title="Child 4" documentType="page"></DocumentTreeParent>
        <DocumentTreeParent title="Child 5" documentType="page"></DocumentTreeParent>
    </DocumentTreeSection>
    <DocumentTreeSection expanded={true}>
        <DocumentTreeParent title="Grandchild 1" documentType="page"></DocumentTreeParent>
        <DocumentTreeParent children={true} title="Grandchild 2" documentType="page"></DocumentTreeParent>
        <DocumentTreeParent selected={true} title="Grandchild 3" documentType="page"></DocumentTreeParent>
    </DocumentTreeSection>
    <DocumentTreeSection>
        <DocumentInspector {...document} />
    </DocumentTreeSection>
</DocumentTree>;

export const Default = Template.bind({});
Default.args = {
}


export const DragAndDrop = Template.bind({});
DragAndDrop.args = {
}