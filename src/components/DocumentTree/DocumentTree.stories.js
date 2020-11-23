import React from 'react';
import DocumentTree from './DocumentTree';
import DocumentTreeSection from './DocumentTreeColumn';
import DocumentTreeModule from './DocumentTreeModule';
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
        <DocumentTreeModule children={true} selected={true} title="Parent 1" documentType="page"></DocumentTreeModule>
        <DocumentTreeModule children={true} title="Parent 2" documentType="page"></DocumentTreeModule>
    </DocumentTreeSection>
    <DocumentTreeSection expanded={true}>
        <DocumentTreeModule children={true} title="Child 1" documentType="page"></DocumentTreeModule>
        <DocumentTreeModule children={true} selected={true} title="Child 2" documentType="page"></DocumentTreeModule>
        <DocumentTreeModule children={true} title="Child 3" documentType="page"></DocumentTreeModule>
        <DocumentTreeModule title="Child 4" documentType="page"></DocumentTreeModule>
        <DocumentTreeModule title="Child 5" documentType="page"></DocumentTreeModule>
    </DocumentTreeSection>
    <DocumentTreeSection expanded={true}>
        <DocumentTreeModule title="Grandchild 1" documentType="page"></DocumentTreeModule>
        <DocumentTreeModule children={true} title="Grandchild 2" documentType="page"></DocumentTreeModule>
        <DocumentTreeModule selected={true} title="Grandchild 3" documentType="page"></DocumentTreeModule>
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