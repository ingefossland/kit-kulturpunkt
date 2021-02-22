import React, { useRef, useEffect, useState } from "react"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    table: {
        width: "100%",
        overflowY: "scroll",

        tableLayout: "fixed",
        borderCollapse: "collapse",
        borderSpacing: 0,

        "& th": {
            width: "50%",
            width: 320,
//            position: "sticky"
        },

        "& td": {
            paddingLeft: theme.spacing(1),
            paddingRight: theme.spacing(1),
        },

        "& > thead > tr > th": {
        },
 
        "& > tbody > tr": {

            "& > *": {
                borderTop: "1px solid",
                borderColor: theme.palette.divider,

                "&[aria-selected=true]": {
                    backgroundColor: theme.palette.action.selected,
                }
    
            }

        }

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

const TableView = ({cols = [], header, footer, children, sortable, sort, onSort}) => {
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
        <table className={classes.table}>
            <thead className={classes.head}>
                <tr>
                    { cols.map((name, index) => {

                        const selected = sort && sort.startsWith(name)

                        if (index === 0) {
                            return <th aria-selected={selected} onClick={() => _onSort(name)}><Label name={name} key={index}/></th>
                        }

                        return <td aria-selected={selected} onClick={() => _onSort(name)}><Label name={name} key={index} /></td>

                    })}
                </tr>
            </thead>
            <tbody className={classes.body}>
                {header}
                {children}
                {footer}
            </tbody>
        </table>
    )

}

TableView.defaultProps = {
    cols: [
        "title",
        "status",
        "updatedAt",
        "createdAt",
        "uniqueId"
    ]
}

export default TableView;