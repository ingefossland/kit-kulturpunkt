import React from 'react';
import PropTypes from 'prop-types';

import EditableModule from "./EditableModule"
import ExpandedModule from "./ExpandedModule"

import ListModule from "./ListModule"
import TableModule from "./TableModule"
import GridModule from "./GridModule"
import CardModule from "./CardModule"

const templates = {
    "list": ListModule,
    "table": TableModule,
    "grid": GridModule,
    "card": CardModule,
}

const Module = ({
    variant,
    expanded,
    editable,
    editing,
    children,
    ...props
}) => {

    if (editable && editing) {
        return (
            <EditableModule {...props} editing={true}>
                {children}
            </EditableModule>
        )
    }

    if (expanded) {
        return (
            <ExpandedModule {...props} editable={editable} editing={editing}>
                {children}
            </ExpandedModule>
        )
    }

    const ModuleTemplate = templates && templates[variant] || ListModule

    return (
        <ModuleTemplate {...props} editable={editable} editing={editing} />
    )

}

Module.defaultProps = {
    variant: "list",
    expanded: false,
    editable: false,
    editing: false,
}

Module.propTypes = {
    variant: PropTypes.oneOf(["list","table","grid","card"]),
    expanded: PropTypes.bool,
    editable: PropTypes.bool,
    editing: PropTypes.bool,
    title: PropTypes.string,
    description: PropTypes.string,
    label: PropTypes.any,
    status: PropTypes.string,
    datetime: PropTypes.string,
    author: PropTypes.string,
    status: PropTypes.string
}

export default Module;
