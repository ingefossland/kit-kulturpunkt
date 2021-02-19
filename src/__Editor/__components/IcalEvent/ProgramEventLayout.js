import React from 'react';
import PropTypes from 'prop-types';

import { ExpandedModule, ListModule } from "@kit-ui/admin"

import EventModule from "./ProgramEventModule"

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

            buttons = [
                {
                    title: "Save",
                    onClick: onSave
                }
            ]

        return (
            <ExpandedModule {...props} buttons={buttons}>
                {children}
            </ExpandedModule>
        )
    }

    return (
        <EventModule
            {...props}
            editable={editable}
        />
    )

}

EditableModule.defaultProps = {
    editable: true
}

EditableModule.propTypes = {
    editable: PropTypes.bool,
    editing: PropTypes.bool
}

export default EditableModule;
