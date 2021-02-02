import React, { useEffect, useState } from "react"

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    section: {
        width: "100%"
    },
    title: {
        fontFamily: 'Akkurat, sans-serif',
        fontSize: '1em',
        fontWeight: 'bold',
        marginTop: "1.5em",
    },
}));

const ArticleSection = ({title, children}) => {

    const classes = useStyles()

    return (
        <section className={classes.section}>
            {title && <h2 className={classes.title}>{title}</h2> }
            {children}
        </section>
    )


}

export default ArticleSection;