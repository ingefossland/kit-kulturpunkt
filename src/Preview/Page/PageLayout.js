import React from "react"
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    page: {
        backgroundColor: "white",
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        overflowY: "scroll"
    },
}));

const PageLayout = ({children}) => {

    const classes = useStyles()

    return (
        <main className={classes.page}>
            {children}
        </main>
    )

}

export default PageLayout