import React, { useRef, useEffect, useState } from "react"
import TableModule from "./TableModule"

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    wrapper: {
        width: "100%",
        overflowX: "scroll"

    },
    table: {
        width: "100%",
        borderCollapse: "collapse",
        borderSpacing: 0,

        "& th": {
            zIndex: 1,
            left: 0,
            width: "25%",
            borderTop: "1px solid",
            borderColor: theme.palette.divider
        },

        "& td": {
            borderTop: "1px solid",
            borderLeft: "1px solid",
            borderColor: theme.palette.divider
        },

        "& th, & td": {
        },

        "& > tr + tr": {

            "& > *": {
                borderTop: "1px solid",
                borderColor: theme.palette.divider
            }

        }


    },
}));

const TableView = ({items = [], itemsById = {}, onSelect}) => {

    const classes = useStyles()

    const _onSelect = (item) => {
        onSelect && onSelect(item)
    }

    const cols = [
        "header",
        "identifier",
        "producer",
        "dating",
        "materials",
        "technique",
    ]
 
    return (
        <div className={classes.wrapper}>

            <table className={classes.table}>

                <thead className={classes.head}>

                    <tr>
                        { cols.map((col, index) => <th>{col}</th>)}
                    </tr>

                </thead>

                <tbody className={classes.body}>

                    {items && items.map((item, index) => {

                        return (
                            <TableModule {...item} key={index} onClick={() => _onSelect(item)}/>
                        )
        
                    })}

                </tbody>

            </table>
        </div>
    )

}

export default TableView;