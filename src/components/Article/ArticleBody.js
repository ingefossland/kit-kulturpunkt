import React from "react"
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    body: {
        position: "relative",
        width: "100%"
    }
}));

const ArticleBody = ({children}) => {

    const classes = useStyles()

    return (
        <div className={classes.body}>
            {children}
        </div>
    )

}

export default ArticleBody