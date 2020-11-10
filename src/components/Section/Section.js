import React from 'react';
import PropTypes from "prop-types"

import CollapsibleSection from "./CollapsibleSection"
import DefaultSection from "./DefaultSection"

const templates = {
    "collapsible": CollapsibleSection,
    "default": DefaultSection
}

const Section = ({collapsible, children, ...props}) => {

    if (collapsible) {
        return (
            <CollapsibleSection {...props}>
                {children}
            </CollapsibleSection>
        )
    }
    
    return (
        <DefaultSection {...props}>
            {children}
        </DefaultSection>
    )

}

Section.propTypes = {
    collapsible: PropTypes.bool
}

Section.defaultProps = {
    collapsible: false
}

export default Section;