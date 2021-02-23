import React, { useRef, useEffect, useState } from "react"
import { makeStyles } from '@material-ui/core/styles';
import { NavPath } from "../NavPath"
import { NavView } from "../NavView"
import { NavAction } from "../NavAction"

const useStyles = makeStyles(theme => ({
    header: {
        minHeight: 64,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxSizing: "border-box"
    },
    title: {

    },
    nav: {
        display: "flex",
        alignItems: "center",

        "& > * + *": {
            marginLeft: 6
        }
    },
    toolbar: {
        display: "flex",
        alignItems: "center",

        "& > * + *": {
            marginLeft: 6
        }

    }

}));

const ViewHeader = ({
    parents = [],
    title,
    description,

    viewAction,

    view,
    viewOptions,
    onView,

    rows,
    rowsOptions,
    onRows,

    sort,
    sortOptions,
    onSort,

    size,
    sizeOptions,
    onSize,

    options,
    onSelect,
}) => {

    const classes = useStyles()

    return (
        <header className={classes.header}>
            <NavPath parents={parents} title={title} description={description} onSelect={onSelect} />
            <NavView
                viewOptions={viewOptions}
                view={view}
                onView={onView}

                sortOptions={sortOptions}
                sort={sort}
                onSort={onSort}

                sizeOptions={sizeOptions}
                size={size}
                onSize={onSize}

                rowsOptions={rowsOptions}
                rows={rows}
                onRows={onRows}

            />
        </header>
    )

}

export default ViewHeader;