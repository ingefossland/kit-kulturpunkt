import React, { useState, useEffect } from "react"
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    row: {
        width: "100%",
        display: "flex",
        alignItems: "center",
    },
    label: {
        minWidth: 120
    },
    value: {
        flexGrow: 1,
    }
}));

const RRuleHeaderLayout = ({title, children}) => {

    const classes = useStyles()

    return (
        <div className={classes.row}>
            <Typography className={classes.label}>{title}</Typography>
            <div className={classes.value}>
                {children}
            </div>
        </div>
    )

}

export default RRuleHeaderLayout