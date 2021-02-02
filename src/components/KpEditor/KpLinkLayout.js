import React from 'react';
import PropTypes from 'prop-types';

import KpLinkCollapsed from "./KpLinkCollapsed"
import KpLinkExpanded from "./KpLinkExpanded"

const KpLinkLayout = ({
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

        return (
            <KpLinkExpanded {...props} buttons={buttons}>
                {children}
            </KpLinkExpanded>
        )
    }

    return (
        <KpLinkCollapsed
            {...props}
            editable={editable}
        />
    )

}

KpLinkLayout.defaultProps = {
    padding: 2,
    editable: true
}

KpLinkLayout.propTypes = {
    editable: PropTypes.bool,
    editing: PropTypes.bool
}

export default KpLinkLayout;
