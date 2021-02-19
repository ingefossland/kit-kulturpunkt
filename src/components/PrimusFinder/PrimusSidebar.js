import React, { useRef, useState, useMemo, useLayoutEffect } from "react"
import { makeStyles } from '@material-ui/core/styles';

import { NavAction } from "../NavAction"
import NavFilters from "./NavFilters"

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
        paddingLeft: 16,
        paddingRight: 8,
        paddingTop: 96,
        overflowY: "scroll"
    }

}));


const PrimusSidebar = (props) => {

    const { filters, onFilter } = props

    const classes = useStyles()

    return (
        <div className={classes.sidebar}>
            <NavAction className={classes.action} menu={[{title: "Create"}]} />
            <NavFilters className={classes.filters} filters={filters} onSelect={onFilter} />
        </div>
    )

}

export default PrimusSidebar;