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
            flexBasis: 240,
        }

    },


}));

const FinderSidebar = ({
    expanded = true,
    children
}) => {

    const classes = useStyles()

    return (
        <aside className={classes.sidebar} aria-expanded={expanded}>
            {children}
        </aside>
    )

}

export default FinderSidebar;