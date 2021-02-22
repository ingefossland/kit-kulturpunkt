import React, { useRef, useEffect, useState } from "react"
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    list: {
        display: "block",

        "& > * + *": {
            borderTop: "1px solid",
            borderColor: theme.palette.divider
        }


    },
}));

const ListView = ({header, footer, children}) => {

    const classes = useStyles()

    return (
        <div className={classes.list}>
            {header}
            {children}
            {footer}
        </div>
    )

}

export default ListView;