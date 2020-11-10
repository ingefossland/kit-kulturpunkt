import React from "react"
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    article: {
        padding: 0,
        margin: 0,
        position: "relative",
        backgroundColor: "white",
        paddingBottom: 100,

        fontSize: 18,

        [theme.breakpoints.up('sm')]: {
            fontSize: 18
        },        
        [theme.breakpoints.up('md')]: {
            fontSize: 20
        },        
        [theme.breakpoints.up('lg')]: {
            fontSize: 24
        },        
        [theme.breakpoints.up('xl')]: {
            fontSize: 30
        },        
    },
}));

const CheckoutBase = ({id, children}) => {

    const classes = useStyles()

    return (
        <article id={id} className={classes.article}>
            {children}
        </article>
    )

}


export default CheckoutBase