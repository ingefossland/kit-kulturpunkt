import React from "react"
import { makeStyles } from '@material-ui/core/styles';

import Color from 'color';

const getContrast = (color) => {

    color = Color(color);

    if (color.isDark()) {
        return "white"
    } else {
        return "black"
    }

}

const useStyles = makeStyles(theme => ({
    header: {
        backgroundColor: props => { return props.backgroundColor || "#eee" }, // theme.palette.background.default,
        color: props => { return props.backgroundColor && getContrast(props.backgroundColor) }, // theme.palette.background.default,
        display: "block",
        width: "100%",
    },
}));

const ArticleHeader = ({children, expanded, ...props}) => {

    const classes = useStyles(props)

    return (
        <header className={classes.header} aria-expanded={expanded}>
            {children}
        </header>
    )

}

export default ArticleHeader