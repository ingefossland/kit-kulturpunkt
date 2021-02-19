import React, { useEffect, useState } from "react"
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    link: {
        borderBottom: "1px solid",
        borderColor: "rgba(0,0,0,.5)",
        "&:hover": {
            cursor: "pointer",
            borderColor: theme.palette.text.primary
        },
    },
    value: {
        fontStyle: "normal",

        "& + $value": {
            "&:before": {
                content: '", "'
            }
        }
    }
}));

const MetaValue = ({children, onClick}) => {
    const classes = useStyles()

    if (onClick) {
        return (
            <span className={classes.value}>
                <a className={classes.link} onClick={onClick}>{children}</a>
            </span>
        )
    }

    return <span className={classes.value}>{children}</span>

}

export default MetaValue;