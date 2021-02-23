import React, { useRef, useEffect, useState } from "react"
import { makeStyles } from '@material-ui/core/styles';
import { NavPath } from "../NavPath"
import { NavView, ViewOptions, RowsOptions, SortOptions, SizeOptions } from "../NavView"
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

            <div className={classes.nav}>

                { options && <NavView className={classes.toolbar} options={options} onChange={onSelect} /> }

                { sortOptions && <SortOptions options={sortOptions} value={sort} onChange={onSort} /> }
                { rowsOptions && <RowsOptions options={rowsOptions} value={rows} onChange={onRows} /> }
                { sizeOptions && <SizeOptions options={sizeOptions} value={size} onChange={onSize} /> }
                { viewOptions && <ViewOptions options={viewOptions} value={view} onChange={onView} /> }

                { viewAction && <NavAction menu={[viewAction]} /> }

            </div>

        </header>
    )

}

export default ViewHeader;