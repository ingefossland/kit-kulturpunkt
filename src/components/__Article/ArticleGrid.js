import React from "react"
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    grid: {
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        margin: "auto",

        [theme.breakpoints.up('sm')]: {
            maxWidth: 512,
        },
        [theme.breakpoints.up('md')]: {
            maxWidth: 792,
        },
        [theme.breakpoints.up('lg')]: {
            maxWidth: 1056,
        },
        [theme.breakpoints.up('xl')]: {
            maxWidth: 1408,
        }
        
    },
}));

const ArticleGrid = ({children}) => {

    const classes = useStyles()

    return (
        <div className={classes.grid}>
            {children}
        </div>
    )

}


export default ArticleGrid