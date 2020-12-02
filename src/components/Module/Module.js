import React from 'react';
import PropTypes from 'prop-types';

import CollapsedModule from "./CollapsedModule"
import ExpandedModule from "./ExpandedModule"

/** Module, use for documents or media objects */

const Module = ({
    editable,
    expanded,
    buttons,
    onSave,
    children,
    ...props
}) => {

    if (editable && expanded) {

        if (!buttons || !buttons.length) {
            buttons = [
                {
                    title: "Save",
                    onClick: onSave
                }
            ]
        }

    }

    if (expanded) {
        return (
            <ExpandedModule {...props} buttons={buttons}>
                {children}
            </ExpandedModule>
        )
    }

    return (
        <CollapsedModule
            {...props}
            editable={editable}
        />
    )

}

Module.defaultProps = {
    padding: 2,
    editable: false
}

Module.propTypes = {
    editable: PropTypes.bool,
    editing: PropTypes.bool
}

export default Module;
