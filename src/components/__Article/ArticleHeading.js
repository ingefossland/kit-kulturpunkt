import React from "react"
import Typography from "@material-ui/core/Typography"
import ReactMarkdown from 'react-markdown'

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    
    title: {
        fontFamily: "Akkurat, sans-serif",
        fontWeight: "bold",
        fontWeight: "normal",
        fontSize: "24px",
        margin: 0,

        "& + *": {
            marginTop: "1em"
        },

    },
    

}));


const ArticleTitle = ({children}) => {

    const classes = useStyles()

    return (
        <Typography className={classes.title}>{children}</Typography>
    )


}


export default ArticleTitle