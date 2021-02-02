import React from 'react';
import PropTypes from 'prop-types';

import FinderBase from "./FinderBase"
import FinderHeader from "./FinderHeader"
import FinderToolbar from "./FinderToolbar"

import FinderBody from "./FinderBody"
import NavPath from "../NavPath/NavPath"

/** FinderLayout represents a view within an app. Normally this would be wrapped in AppLayout */

const FinderLayout = ({backgroundColor, expanded, title, parents, filters, action, views, search, children, onSelect}) => {

    return (
        <FinderBase backgroundColor={backgroundColor} expanded={expanded}>
            <FinderHeader backgroundColor={backgroundColor}>
                <NavPath parents={parents} title={title} filters={filters} search={search} onSelect={onSelect} />
                { action && <FinderToolbar buttons={action}  /> }
            </FinderHeader>
            <FinderBody>
                { children }
            </FinderBody>
        </FinderBase>
    )

}

FinderLayout.propTypes = {
    backgroundColor: PropTypes.string,
    expanded: PropTypes.bool,
    title: PropTypes.string,
    /** Array of parents */
    parents: PropTypes.array,
    filters: PropTypes.array,
    action: PropTypes.array,
    views: PropTypes.array,
    search: PropTypes.object,
    /** Finder content */
    children: PropTypes.node
}


export default FinderLayout;