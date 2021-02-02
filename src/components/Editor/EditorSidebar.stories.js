import React from 'react';
import EditorBase from './EditorBase';
import EditorHeader from './EditorHeader';
import EditorBody from './EditorBody';
import EditorSection from './EditorSection';
import EditorSidebar from './EditorSidebar';

export default {
    title: 'Editor/EditorSidebar',
    component: EditorSidebar,
    args: {
        header: {
            title: "Sidebar",
        },
        sidebar: {
            expanded: true
        }
    },
    argTypes: {
    },
};

const Template = (args) => (
    <EditorBase>
        <EditorHeader {...args.header} />
        <EditorBody>
            <EditorSidebar {...args.sidebar}>Sidebar</EditorSidebar>
            <EditorSection>
            </EditorSection>
        </EditorBody>
    </EditorBase>
)

export const Expanded = Template.bind({});
Expanded.args = {
    header: {
        title: "Sidebar expanded",
    },
    sidebar: {
        expanded: true
    }
}

export const Collapsed = Template.bind({});
Collapsed.args = {
    header: {
        title: "Sidebar collapsed",
    },
    sidebar: {
        expanded: false
    }
}
