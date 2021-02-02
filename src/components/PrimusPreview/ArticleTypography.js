import React from "react"
import ReactMarkdown from 'react-markdown'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    typography: {
        fontFamily: "Akkurat, sans-serif",
        fontSize: "1em",
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
        

        "& > h2": {
            fontWeight: "normal",
            fontSize: "1.5em",
            marginTop: "1em",
            marginBottom: 0,
        },

        "& > h3": {
            fontSize: "1em",
            fontWeight: "bold",
            marginTop: "1em",
            marginBottom: ".5em",

            "& + p": {
                marginTop: "-.5em"
            }

        }

    },
        

}));


const ArticleSection = ({children}) => {

    const classes = useStyles()

    return <ReactMarkdown className={classes.typography}>{children}</ReactMarkdown> 

}


export default ArticleSection