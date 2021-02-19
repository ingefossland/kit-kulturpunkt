import React, { useRef, useEffect, useState } from "react"
import { makeStyles } from '@material-ui/core/styles';

import { NavView } from "../NavView"
import { NavAction } from "../NavAction"
import { NavPath } from "../NavPath"

const useStyles = makeStyles(theme => ({
    header: {
        minHeight: 96,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: theme.spacing(2),
        boxSizing: "border-box"
    },
    title: {

    },
    toolbar: {
        display: "flex",
        alignItems: "center",

        "& > * + *": {
            marginLeft: 6
        }

    }

}));

const ViewHeader = (props) => {

    const { view = "list", viewOptions = ["list","grid"], onViewChange, selected = 0, count = 0, onScroll, onSelect, onSelectAll, onSelectToggle, onUnselectAll, onBulkEdit, children} = props

    const classes = useStyles()

    if (selected > 0) {

        const selectAll = {
            title: "Velg alle",
            onClick: onSelectAll
        }

        const selectNone = {
            title: "Fjen alle",
            onClick: onUnselectAll
        }

        const selectToggle = {
            title: "Toggle selected",
            onClick: onSelectToggle
        }

        const select = {
            title: "Velg",
            variant: "outlined",
            children: [
                selectAll,
                selectToggle,
                selectNone,
            ]

        }

        const bulkEdit = {
            title: "Rediger",
            onClick: onBulkEdit
        }

        const createReport = {
            title: "Lag rapport",
        }

        const addToFolder = {
            title: "Legg i mappe",
        }

        const edit = {
            title: "Behandle",
            variant: "outlined",
            children: [
                bulkEdit,
                createReport,
                addToFolder
            ]
        }

        const menu = selected >= 2 && [select,edit] || [select]

        const title = selected + " of " + count
       
        return (
            <header className={classes.header}>
                <NavPath title={title} />
                <NavAction menu={menu} />

            </header>
        )
    }

    const title = count + "items"

    return (
        <header className={classes.header}>
            <NavPath title={title} />
            <NavView value={view} options={viewOptions} onChange={onViewChange} />
        </header>
    )

}

export default ViewHeader;