import React from 'react'
import { EditorBase, EditorHeader, EditorBody, EditorFooter, EditorOverlay } from "@kit-ui/admin"

const PageEditor = ({collapsible, expanded, overlay, onToggle, onSelect, children, ...props}) => {

    const renderOverlay = () => {
        const OverlayTemplate = overlay && overlay.template;

        return (
            <EditorOverlay position="fixed" expanded={overlay && overlay.expanded}>
                { OverlayTemplate && <OverlayTemplate {...overlay} /> }
            </EditorOverlay>
        )
    }

    return (
        <EditorBase>
            <EditorHeader {...props} collapsible={collapsible} expanded={expanded} onToggle={onToggle} onSelect={onSelect} />
            <EditorBody elevation={1} expanded={expanded}>
                {children}
            </EditorBody>
            <EditorFooter {...props} />
            { overlay && renderOverlay() }
        </EditorBase>
    )
}

export default PageEditor;