import React from "react"
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    wrapper: {
        maxWidth: props => { return props.maxWidth },
        margin: "auto"
    },
}));


const ArticleGrid = ({className, maxWidth = 720, children}) => {
    const classes = useStyles({maxWidth})

    return (
        <section className={className || classes.wrapper}>
            {children}
        </section>
    )

}

export default ArticleGrid