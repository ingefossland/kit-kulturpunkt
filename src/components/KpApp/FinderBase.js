import React, { useEffect, useState, useMemo } from "react"
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    base: {
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        display: "flex",
        width: "100%",
        height: "100%"
    },
}));

const FinderBase = ({children}) => {

    const classes = useStyles()

    return (
        <div className={classes.base}>
            {children}
        </div>
    )

}

export default FinderBase;