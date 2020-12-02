import React from 'react';
import PropTypes from "prop-types"

import {
    EditableSection,
    CollapsibleSection,
    DefaultSection
} from "./"


const Section = ({collapsible, editable, ...props}) => {

    if (editable) {
        return <EditableSection {...props} />
    }

    if (collapsible) {
        return <CollapsibleSection {...props} />
    }

    return <DefaultSection {...props} />

}

Section.propTypes = {
    expanded: PropTypes.bool,
    onToggle: PropTypes.func
}

Section.defaultProps = {
    position: "relative",
    editable: false,
    collapsible: false,
    expanded: true
}

export default Section;