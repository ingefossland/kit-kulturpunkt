import React from "react"
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    sidebar: {
        width: "100%",
        maxWidth: "100%",

        /*
        
        [theme.breakpoints.up('md')]: {
            minWidth: 320,
            maxWidth: 320,
            position: "absolute",
            top: 0,
            right: 0
        },

        */

        [theme.breakpoints.up('lg')]: {
            position: "absolute",
            top: 0,
            right: 0,
            bottom: "auto",
            left: "auto",
            width: 338,
        },

        [theme.breakpoints.up('xl')]: {
            width: 448,
        },
        
    },

}));

const ArticleSidebar = ({children}) => {

    const classes = useStyles()
    
    return (
        <aside className={classes.sidebar}>
            {children}
        </aside>
    )

}


export default ArticleSidebar