import React, { useRef, useState, useMemo, useLayoutEffect } from "react"
import { makeStyles } from '@material-ui/core/styles';

import { NavAction } from "../NavAction"
import { NavMenu } from "../NavMenu"

import icons from "../KpIcons"

const useStyles = makeStyles(theme => ({
    action: {
        position: "absolute",
        zIndex: 2,
        top: 0,
        left: 0,
        minHeight: 96,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: theme.spacing(2),
        boxSizing: "border-box",
        boxShadow: "none",

    },
    filters: {
        position: "absolute",
        zIndex: 1,
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        paddingLeft: 0,
        paddingRight: 8,
        paddingTop: 96,
        overflowY: "scroll"
    }

}));


const KpSidebar = (props) => {

    const { menu, onSelect } = props

    const classes = useStyles()

    return (
        <div className={classes.sidebar}>
            <NavAction className={classes.action} menu={[{title: "Create"}]} />
            <NavMenu className={classes.filters} icons={icons} menu={menu} onSelect={onSelect} />
        </div>
    )

}

export default KpSidebar;