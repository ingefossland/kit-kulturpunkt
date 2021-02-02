import React, { useEffect, useState, useMemo } from "react"
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    sidebar: {
        flexBasis: 0,
        flexGrow: 0,
        width: 0,
        height: "100%",
        overflow: "hidden",
        position: "relative",

        "&[aria-expanded=true]": {
            flexBasis: props => { return props.width },
        }

    },


}));

const FinderSidebar = ({
    width = 240,
    expanded = true,
    children
}) => {

    const classes = useStyles({width})

    return (
        <aside className={classes.sidebar} aria-expanded={expanded}>
            {children}
        </aside>
    )

}

export default FinderSidebar;