import React from 'react';
import PropTypes from "prop-types"
import Collapse from '@material-ui/core/Collapse';

import {
    EditableSection,
    CollapsibleSection,
    DefaultSection
} from "./"


const SectionLayout = ({collapsible, editable, ...props}) => {

    if (editable) {
        return <EditableSection {...props} />
    }

    if (collapsible) {
        return <CollapsibleSection {...props} />
    }

    return <DefaultSection {...props} />

}

SectionLayout.propTypes = {
    expanded: PropTypes.bool,
    onToggle: PropTypes.func
}

SectionLayout.defaultProps = {
    position: "relative",
    editable: false,
    collapsible: false,
    expanded: true
}

export default SectionLayout;