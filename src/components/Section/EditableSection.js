import React from 'react';
import PropTypes from "prop-types"
import SectionBase from "./SectionBase"
import SectionHeader from "./SectionHeader"
import SectionBody from "./SectionBody";
import SectionFooter from "./SectionFooter"
import SectionButtons from "./SectionButtons"
import Collapse from '@material-ui/core/Collapse';

const EditableSection = ({position = "relative", editable = true, expanded = false, title, description, buttons, children, ...props}) => {

    return (
        <SectionBase position={position} editable={editable} expanded={expanded}>
            <SectionHeader {...props} title={title} description={description} editable={editable} expanded={expanded} />
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <SectionBody position={position} {...props}>
                    { children }
                </SectionBody>
                { expanded && <SectionFooter><SectionButtons buttons={buttons} /></SectionFooter> }
            </Collapse>
        </SectionBase>
    )

}

EditableSection.propTypes = {
    editable: PropTypes.bool,
    removable: PropTypes.bool,
    hideable: PropTypes.bool,
    expanded: PropTypes.bool,
    onToggle: PropTypes.func
}

EditableSection.defaultProps = {
    editable: true,
    padding: 2,
    spacing: 0
}

export default EditableSection;