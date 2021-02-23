import React, { useRef, useEffect, useState } from "react"
import { makeStyles } from '@material-ui/core/styles';
import { ViewOptions, RowsOptions, SortOptions, SizeOptions } from "./"

const useStyles = makeStyles(theme => ({
    nav: {
        display: "flex",
        alignItems: "center",

        "& > * + *": {
            marginLeft: 6
        }
    }
}));

const NavView = ({
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
        <div className={classes.nav}>
            { sortOptions && <SortOptions options={sortOptions} value={sort} onChange={onSort} /> }
            { rowsOptions && <RowsOptions options={rowsOptions} value={rows} onChange={onRows} /> }
            { sizeOptions && <SizeOptions options={sizeOptions} value={size} onChange={onSize} /> }
            { viewOptions && <ViewOptions options={viewOptions} value={view} onChange={onView} /> }
        </div>
    )

}

export default NavView;