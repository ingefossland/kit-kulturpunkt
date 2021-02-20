import React from "react"
import CircularProgress from '@material-ui/core/CircularProgress';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    loading: {
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",

        "& + *": {
            opacity: .75
        }

    }
}));

const ViewLoader = ({isLoading = true, children}) => {

    const classes = useStyles()

    if (isLoading) {
        return (
            <>
                <div className={classes.loading}>
                    <CircularProgress />
                </div>
                {children}
            </>
        )
    }

    return children

}

export default ViewLoader;