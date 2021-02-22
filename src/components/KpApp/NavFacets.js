import React from "react"
import _ from "lodash"

import { makeStyles } from '@material-ui/core/styles';

import Link from "@material-ui/core/Link"
import Typography from "@material-ui/core/Typography"

const useStyles = makeStyles(theme => ({
    list: {
        listStyle: "none",
        padding: 0,
        margin: 0,
    },
    item: {
        marginTop: 3,

        "& + $item": {
        },

    },
    link: {
        fontFamily: "Akkurat, sans-serif",
//        display: "flex",
//        alignItems: "center",
        "&:hover": {
            cursor: "pointer"
        }
    },
    label: {
        display: "inline",
        fontFamily: "Akkurat, sans-serif",
        fontWeight: "normal",
        fontSize: 14,
        lineHeight: 1.5,
        color: theme.palette.text.primary
    },
    count: {
        display: "inline",
        fontSize: 12,
        fontStyle: "normal",
        lineHeight: 2,
        color: theme.palette.text.secondary
    }
}));

const NavFacets = ({name, facets = [], onSelect}) => {

    const classes = useStyles()

    const sortedFacets = _.orderBy(facets, ['count','value'], ['desc', 'asc']);

    const _onSelect = (facet) => {
        onSelect && onSelect({
            name: name,
            ...facet
        })
    }

    const FacetsItem = ({value, count, onClick}) => {
        return (
            <li className={classes.item}>
                <Link className={classes.link} onClick={onClick}>
                    <b className={classes.label}>{value}</b>
                    <i className={classes.count}>{count}</i>
                </Link>
            </li>
        )
    }

    const FacetsList = ({children}) => {
        return (
            <ul className={classes.list}>{children}</ul>
        )
    }

    return (
        <FacetsList>
            {sortedFacets.map((facet, index) => <FacetsItem {...facet} key={index} onClick={() => _onSelect(facet)} />)}
        </FacetsList>

    )

}


export default NavFacets