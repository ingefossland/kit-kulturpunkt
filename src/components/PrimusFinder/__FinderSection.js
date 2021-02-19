import React, { useEffect, useState } from "react"
import { AppBase, AppHeader, AppBody } from "../App"
import { makeStyles } from '@material-ui/core/styles';

import ListView from "./ListView"

import FinderPreview from "./FinderPreview"
import FinderEditor from "./FinderEditor"
import FinderView from "./FinderView"

const useStyles = makeStyles(theme => ({
    base: {
        display: "flex",
        width: "100%",
        height: "100%"
    },
    sidebar: {
        flexBasis: 0,
        flexGrow: 0,
        width: 0,
        overflow: "hidden",

        "&[aria-expanded=true]": {
            flexBasis: 240,
//            width: 240
        }

    },
    section: {
        flexBasis: 1,
        flexGrow: 0,
        width: 0,
//        overflow: "hidden",
        position: "relative",

        "&[aria-expanded=true]": {
            flexGrow: 1,
            width: "auto"
        },

    },
    content: {
        flexBasis: 1,
        flexGrow: 0,
        width: 0,
        overflow: "hidden",
        position: "relative",

        "&[aria-expanded=true]": {
            flexGrow: 1,
            width: "auto"
        }

    },
    preview: {
        flexBasis: 1,
        flexGrow: 0,
        width: 0,
        overflow: "hidden",
        backgroundColor: "white",
        boxShadow: theme.shadows[4],
        position: "relative",
        transition: ".125s ease-out",

        "&[aria-expanded=true]": {
            flexGrow: 1,
            width: "auto"
        }

    },
    action: {
        flexBasis: 1,
        flexGrow: 0,
        width: 0,
        overflow: "hidden",
        backgroundColor: theme.palette.background.default,
        boxShadow: theme.shadows[4],
        position: "relative",

        "&[aria-expanded=true]": {
            flexGrow: 1,
            width: "auto"
        }

    },

}));

const FinderSection = ({
    expanded = true,
    children
}) => {

    const classes = useStyles()

    return (
        <div aria-expanded={expanded} className={classes.section}>
            {children}
        </div>
    )

}

export default FinderSection;