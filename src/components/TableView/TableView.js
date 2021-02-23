import React, { useRef, useEffect, useState } from "react"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from '@material-ui/core/styles';

import TableHead from "./TableHead"

const useStyles = makeStyles(theme => ({
    table: {
        width: "100%",
        overflowY: "scroll",

        tableLayout: "fixed",
        borderCollapse: "collapse",
        borderSpacing: 0,

        "& th": {
//            width: "50%",
//            width: 320,
//            position: "sticky"
        },

        "& [data-name=header], & [data-name=footer]": {
            width: "50%"
        },

        "& td": {
            paddingLeft: theme.spacing(1),
            paddingRight: theme.spacing(1),
        },

        "& > thead + tbody": {

            "& > *": {
                borderTop: "1px solid",
                borderColor: theme.palette.divider,
            }

        },
 
        "& > tbody": {

            "& > tr + tr > *": {
                borderTop: "1px solid",
                borderColor: theme.palette.divider,
            },

            "& > tr > *": {

                "&[aria-selected=true]": {
                    backgroundColor: theme.palette.action.selected,
                }
    
            }

        }

    }
}));

const TableView = ({head = true, cols, header, footer, children, sortable, sort, onSort}) => {
    const classes = useStyles()

    return (
        <table className={classes.table}>
            { head && cols && <TableHead cols={cols} sortable={sortable} sort={sort} onSort={onSort} /> }
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
        "header",
        "footer"
    ]
}

export default TableView;