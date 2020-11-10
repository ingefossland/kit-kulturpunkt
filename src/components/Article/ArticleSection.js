import React from "react"
import ArticleBodytext from "./ArticleBodytext"

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    section: {
        display: "flex",
        flexDirection: "column",

        maxWidth: "100%",

        paddingLeft: theme.spacing(1.5),
        paddingRight: theme.spacing(1.5),

        "& $section": {
            paddingLeft: 0,
            paddingRight: 0
        },

        [theme.breakpoints.up('md')]: {
            paddingLeft: 0,
            paddingRight: 0,
        },

        fontFamily: "Akkurat, sans-serif",
        fontSize: "16px",
        lineHeight: 1.5,

        margin: 0,

        "& > *": {
            marginTop: ".5em",
            marginBottom: ".5em",
        },

        "& > ol": {
            marginTop: "1em",
            marginBottom: "1em",

            "& li + li": {
                marginTop: ".5em"
            }
        },

        "& > ul": {
            marginTop: "1em",
            marginBottom: "1em",

            "& li + li": {
                marginTop: ".5em"
            }
        },
        
        fontFamily: "Akkurat, sans-serif",
        fontSize: 16,
        lineHeight: 1.5,

        "& > h2": {
            fontWeight: "normal",
            fontSize: 24,
            marginTop: "1em",
            marginBottom: 0,
        },

        "& > h3": {
            fontSize: 18,
            fontWeight: "bold",
            marginBottom: 0
        }

    },
        

}));


const ArticleSection = ({title, description, body, children}) => {

    const classes = useStyles()

    return (
        <section className={classes.section}>

            <ArticleBodytext title={title} source={description} />

            {children}

            { body && <ArticleBodytext source={body} /> }


        </section>
    )


}


export default ArticleSection