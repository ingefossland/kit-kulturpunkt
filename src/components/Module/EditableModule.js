import React from 'react';
import PropTypes from 'prop-types';

import ExpandedModule from "./ExpandedModule"
import ListModule from "./ListModule"

/** EditableModule, primarily used in Schema */

const EditableModule = ({
    editable,
    editing,
    buttons,
    onSave,
    children,
    ...props
}) => {

    if (editable && editing) {

        if (!buttons) {
            buttons = [
                {
                    title: "Save",
                    onClick: onSave
                }
            ]
        }

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

EditableModule.defaultProps = {
    padding: 2,
    editable: true
}

EditableModule.propTypes = {
    editable: PropTypes.bool,
    editing: PropTypes.bool
}

export default EditableModule;
