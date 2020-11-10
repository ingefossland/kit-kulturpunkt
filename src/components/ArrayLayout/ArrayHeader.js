import React from "react"
import Typography from "@material-ui/core/Typography"
import ButtonBase from "@material-ui/core/ButtonBase"
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    header: {
        margin: theme.spacing(2, 0),
        display: "flex",
    },
    title: {
        fontFamily: "Akkurat, sans-serif",
        fontWeight: "bold"
    },
    description: {
        fontFamily: "Akkurat, sans-serif"
    },
}));

const ArrayButton = ({title, ...button}) => {

    const classes = useStyles()

    return (
        <ButtonBase className={classes.button} {...button}>
            {title}
        </ButtonBase>
    )

}

const ArrayLayout = ({title = "Array", description, buttons = [], children}) => {

    const classes = useStyles()

    return (
        <header className={classes.header}>
            <Typography className={classes.title}>{title}</Typography>
            <Typography className={classes.description}>{description}</Typography>
        </header>
    )

}

export default ArrayLayout