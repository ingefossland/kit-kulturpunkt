import React from 'react';
import EditorBase from './EditorBase';
import EditorHeader from './EditorHeader';
import EditorBody from "./EditorBody"
import EditorSection from './EditorSection';
import EditorOverlay from './EditorOverlay';

export default {
    title: 'Editor/EditorOverlay',
    component: EditorOverlay,
    args: {
        header: {
            title: "Overlay",
        },
        overlay: {
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
            Content
        </EditorBody>
        <EditorOverlay {...args.overlay}>Overlay</EditorOverlay>
    </EditorBase>
)

export const Expanded = Template.bind({});
Expanded.args = {
    header: {
        title: "Overlay expanded",
    },
    overlay: {
        expanded: true
    }
}

export const Collapsed = Template.bind({});
Collapsed.args = {
    header: {
        title: "Overlay collapsed",
    },
    overlay: {
        expanded: false
    }
}
