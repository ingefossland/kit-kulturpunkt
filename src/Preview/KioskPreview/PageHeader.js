import React from "react"
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    pageHeader: {
        position: props => { return props.position },
        zIndex: 2,
        height: "6em",
        padding: "2em 4em",
        color: "white",
        display: "flex",
        alignItems: "center"
    },
    pageTitle: {
        fontSize: "2em",
    }
}));

const KioskPageHeader = ({title, position = "relative"}) => {

    const classes = useStyles({position})

    return (
        <header className={classes.pageHeader}>
            <Typography className={classes.pageTitle}>{ title }</Typography>
        </header>
    )
}

export default KioskPageHeader