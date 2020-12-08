import React from "react"
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    body: {

    }
}));

const ArticleBody = ({className, children}) => {
    const classes = useStyles()
    return (
        <div className={className || classes.body}>
            {children}
        </div>
    )
}

export default ArticleBody