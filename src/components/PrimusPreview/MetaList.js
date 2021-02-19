import React, { useEffect, useState } from "react"
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    list: {
        width: "100%",
        listStyle: "none",
        padding: 0,
        margin: 0,

        fontFamily: "Akkurat, sans-serif",
        fontSize: "0.875em",
        lineHeight: 1.5,
        borderTop: "1px solid",
        borderColor: "#808080",
        paddingTop: "1em",
        marginTop: "1.5em",
        marginBottom: "1.5em",

        "& $list": {
            borderTop: "none",
            paddingTop: 0,
            marginTop: "0.75em",
            fontSize: "1em"
        }

    }
}));

const MetaList = ({children}) => {
    const classes = useStyles()

    return (
        <ul className={classes.list}>{children}</ul>
    )

}

export default MetaList;