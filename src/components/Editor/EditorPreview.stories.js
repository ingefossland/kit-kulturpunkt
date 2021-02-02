import React from 'react';
import EditorBase from './EditorBase';
import EditorHeader from './EditorHeader';
import EditorSection from './EditorSection';
import EditorSidebar from './EditorSidebar';
import EditorPreview from './EditorPreview';
import EditorContent from './EditorContent';

export default {
    title: 'Editor/EditorPreview',
    component: EditorPreview,
    args: {
        header: {
            title: "Preview",
        },
        sidebar: {
            expanded: false
        }
    },
    argTypes: {
    },
};

const Template = (args) => (
    <EditorBase>
        <EditorHeader {...args.header} />
        <EditorSection>
            <EditorSidebar {...args.sidebar}>Sidebar</EditorSidebar>
            <EditorSection>
                <EditorPreview>
                    Preview
                </EditorPreview>
                <EditorContent>
                    Content
                </EditorContent>
            </EditorSection>
        </EditorSection>
    </EditorBase>
)

export const Default = Template.bind({});
Default.args = {
}

export const ExpandedSidebar = Template.bind({});
ExpandedSidebar.args = {
    header: {
        title: "Sidebar expanded",
    },
    sidebar: {
        expanded: true
    }
}
