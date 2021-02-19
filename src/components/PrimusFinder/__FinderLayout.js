import React, { useEffect, useState, useMemo } from "react"
import { makeStyles } from '@material-ui/core/styles';

import ViewHeader from "./ViewHeader"
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
        overflow: "hidden",
        position: "relative",

        "&[aria-expanded=true]": {
            flexGrow: 1,
            width: "auto"
        },

        "& + $section": {
            boxShadow: theme.shadows[4]
        }

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

const PrimusFinder = ({
    sidebar = {},
    content = {},
    view = {},
    preview = {},
    action = {},
    editor = {}
}) => {

    const classes = useStyles()

    const FinderBase = ({children}) => <div className={classes.base}>{children}</div>
    const FinderSidebar = ({expanded, children}) => <div aria-expanded={expanded} className={classes.sidebar}>{children}</div>
    const FinderSection = ({expanded, children}) => <div aria-expanded={expanded} className={classes.section}>{children}</div>

    return (
        <FinderBase>

            <FinderSidebar {...sidebar}>
                Sidebar
            </FinderSidebar>
            <FinderSection {...content}>
                <FinderView>
                    <ViewHeader {...view} />
                    <ListView {...view} />
                </FinderView>
            </FinderSection>
            <FinderSection {...preview}>
                <FinderPreview {...preview} />
            </FinderSection>
            <FinderSection {...action}>
                <FinderEditor {...editor} />
            </FinderSection>

        </FinderBase>
    )

}

export default PrimusFinder;