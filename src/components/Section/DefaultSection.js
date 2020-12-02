import React from 'react';
import PropTypes from "prop-types"
import SectionBase from "./SectionBase"
import SectionHeader from "./SectionHeader"
import SectionBody from "./SectionBody";
import SectionFooter from "./SectionFooter"
import SectionButtons from "./SectionButtons"

const DefaultSection = ({expanded = true, position = "relative", collapsible, title, description, buttons, children, ...props}) => {

    return (
        <SectionBase position={position} expanded={expanded}>
            <SectionHeader {...props} title={title} description={description} />
            <SectionBody position={position} {...props}>
                { children }
            </SectionBody>
            <SectionFooter {...props}>
                <SectionButtons buttons={buttons} />
            </SectionFooter>
        </SectionBase>
    )

}

DefaultSection.propTypes = {
    collapsible: PropTypes.bool,
    expanded: PropTypes.bool
}

DefaultSection.defaultProps = {
    collapsible: false,
    expanded: true,
    padding: 2,
    spacing: 0
}

export default DefaultSection;