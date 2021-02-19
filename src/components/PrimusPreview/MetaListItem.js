import React, { useEffect, useState } from "react"
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    item: {
        "& + $item": {
            marginTop: "0.75em"
        }
    }
}));

const MetaListItem = ({children}) => {

    const classes = useStyles()

    return (
        <li className={classes.item}>
            {children}
        </li>
    )


}

export default MetaListItem;