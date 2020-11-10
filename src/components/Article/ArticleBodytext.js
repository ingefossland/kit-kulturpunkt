import React from "react"
import ReactMarkdown from 'react-markdown'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    
    bodytext: {


    },
    title: {
        fontFamily: "Akkurat, sans-serif",
        fontSize: 24,
        lineHeight: 1.5,
        marginTop: "1em",
        marginBottom: ".5em",
    }

}));


const ArticleBodytext = ({children, title, source}) => {

    const classes = useStyles()

    if (!source && !title) {
        return false
    }

    return (
        <React.Fragment>
            { title && <h2 className={classes.title}>{title}</h2> }
            <ReactMarkdown source={source || children} />
        </React.Fragment>
    )


}


export default ArticleBodytext