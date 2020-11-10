import React from "react"
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    body: {
//        maxWidth: "100%",

        /*

        [theme.breakpoints.up('md')]: {
            maxWidth: 400,
        },

        */

        [theme.breakpoints.up('lg')]: {
            maxWidth: 660,
        },
        [theme.breakpoints.up('xl')]: {
            maxWidth: 880,
        }, 
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