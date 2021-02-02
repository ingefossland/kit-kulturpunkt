import React, { useEffect, useState, useMemo } from "react"
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    
    section: {
        flexBasis: 1,
        flexGrow: 0,
        width: 0,
        height: "100%",
        overflowY: "hidden",
        position: "relative",

        "&[aria-expanded=true]": {
            flexGrow: 1,
            width: "auto"
        },

        "& + $section": {
            boxShadow: theme.shadows[4]
        }

    }

}));

const FinderSection = ({
    expanded = true,
    children
}) => {

    const classes = useStyles()


    return (
        <div className={classes.section} aria-expanded={expanded}>
            {children}
        </div>
    )

}

export default FinderSection;