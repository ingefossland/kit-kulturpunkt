import React from "react"
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    array: {
        display: "flex",
        flexDirection: "column", 
    },
}));

const ArrayBase = ({className, children}) => {

    const classes = useStyles()

    return (
        <div className={className || classes.array}>
            { children }
        </div>
    )

}

export default ArrayBase