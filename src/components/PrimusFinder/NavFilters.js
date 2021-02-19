import React from "react"
import _ from "lodash"

import { makeStyles } from '@material-ui/core/styles';

import NavFacets from "./NavFacets"
import Typography from "@material-ui/core/Typography"

const useStyles = makeStyles(theme => ({
    list: {
        listStyle: "none",
        padding: 0,
        margin: 0,
    },
    item: {

        "& + $item": {
            marginTop: 16
        }

    },
    label: {
        fontFamily: "Akkurat, sans-serif",
        fontWeight: "bold",
        fontSize: 12,
        lineHeight: 2
    }
}));


const NavFilters = ({className, filters = [], onSelect}) => {

    const classes = useStyles()

    const FilterItem = ({name, facets}) => {
        return (
            <li className={classes.item}>
                <Typography className={classes.label}>{name}</Typography>
                {facets && <NavFacets name={name} facets={facets} onSelect={onSelect} s/>}
            </li>
        )
    }

    const FilterList = ({children}) => {
        return (
            <ul className={classes.list}>{children}</ul>
        )
    }

    return (
        <nav className={className}>
            <FilterList>
                {filters.map((filter, index) => <FilterItem {...filter} key={index} />)}
            </FilterList>
        </nav>
    )


}

export default NavFilters