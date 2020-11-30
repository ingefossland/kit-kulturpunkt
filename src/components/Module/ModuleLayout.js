import React from 'react';
import PropTypes from 'prop-types';

import ExpandedModule from "./ExpandedModule"
import { ListModule } from "../"

/** ModuleLayout, use for documents or media objects */

const ModuleLayout = ({
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
        <ListModule
            {...props}
            editable={editable}
        />
    )

}

ModuleLayout.defaultProps = {
    padding: 2,
    editable: false
}

ModuleLayout.propTypes = {
    editable: PropTypes.bool,
    editing: PropTypes.bool
}

export default ModuleLayout;
