import React from 'react';
import PropTypes from "prop-types"
import SectionBase from "./SectionBase"
import SectionHeader from "./SectionHeader"
import SectionBody from "./SectionBody";
import SectionFooter from "./SectionFooter"
import SectionButtons from "./SectionButtons"
import Collapse from '@material-ui/core/Collapse';

const CollapsibleSection = ({position = "relative", collapsible = true, expanded = false, title, description, buttons, children, ...props}) => {

    return (
        <SectionBase position={position} collapsible={collapsible} expanded={expanded}>
            <SectionHeader {...props} title={title} description={description} collapsible={collapsible} expanded={expanded} />
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <SectionBody position={position} {...props}>
                    { children }
                </SectionBody>
                { expanded && <SectionFooter><SectionButtons buttons={buttons} /></SectionFooter> }
            </Collapse>
        </SectionBase>
    )

}

CollapsibleSection.propTypes = {
    expanded: PropTypes.bool,
    onToggle: PropTypes.func
}

CollapsibleSection.defaultProps = {
    padding: 2,
    spacing: 0
}

export default CollapsibleSection;