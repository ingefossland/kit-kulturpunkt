import React from 'react';
import PropTypes from "prop-types"
import { makeStyles } from '@material-ui/core/styles';

import NavAction from "../NavAction/NavAction"
import NavMenu from "../NavMenu/NavMenu"

const useStyles = makeStyles(theme => ({
    sidebar: {
        position: "relative",
    },
    action: {
        position: "relative",
        zIndex: 2,
        margin: theme.spacing(3)
    }
}));

const AppSidebar = ({className, expanded = false, width = 224, calendar, menu, menuByUrl = {}, primaryAction, onSelect, children}) => {

    const classes = useStyles({width})

    return (
        <aside className={className || classes.sidebar} aria-expanded={expanded}>
            { primaryAction && <NavAction className={classes.action} primaryAction={primaryAction} onSelect={onSelect} />}
            { menu && <NavMenu menu={menu} menuByUrl={menuByUrl} onSelect={onSelect} /> }
            { children }
        </aside>
    )

}

AppSidebar.propTypes = {
    className: PropTypes.string,
    expanded: PropTypes.bool,
    calendar: PropTypes.shape({
        date: PropTypes.string
    }),
    menu: PropTypes.array
}

AppSidebar.defaultProps = {
    calendar: undefined
}

export default AppSidebar;