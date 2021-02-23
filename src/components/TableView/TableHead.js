import React, { useRef, useEffect, useState } from "react"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    head: {

        "& th": {

        },

        "& [data-name=header], & [data-name=footer]": {
            width: "50%"
        },

        "& td": {
            paddingLeft: theme.spacing(1),
            paddingRight: theme.spacing(1),
        },

    },
    label: {
        fontFamily: "Akkurat, sans-serif",
        fontWeight: "bold",
        textAlign: "left",
        fontSize: 14,
        lineHeight: 1.5,
        textTransform: "capitalize",

        marginBottom: theme.spacing(1),
    },
    link: {
        "&:hover": {
            cursor: "pointer"
        }
    }
}));

const TableHead = ({cols = [], header, footer, children, sortable, sort, onSort}) => {
    const classes = useStyles()

    const _onSort = (name) => {
        onSort && onSort(name)
    }

    const Label = ({name}) => {

        let arrow

        if (sort && sort === name) {
            arrow = "↓"
        } else if (sort && sort.startsWith(name)) {
            arrow = "↑"
        }

        return (
            <Typography noWrap className={classes.label}>{arrow} {name}</Typography>
        )

    }

    return (
        <thead className={classes.head}>
            <tr>
                { cols.map((name, index) => {

                    const selected = sort && sort.startsWith(name)

                    if (index === 0) {
                        return <th data-name={name} aria-selected={selected} onClick={() => _onSort(name)}><Label name={name} key={index}/></th>
                    }

                    return <td data-name={name} aria-selected={selected} onClick={() => _onSort(name)}><Label name={name} key={index} /></td>

                })}
            </tr>
        </thead>
    )

}

TableHead.defaultProps = {
    cols: [
        "header",
        "footer"
    ]
}

export default TableHead;