import React from "react"
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import PageMedia from "./PageMedia"

const useStyles = makeStyles(theme => ({
    header: {
        margin: theme.spacing(2)
    },
}));

const PageHeader = ({title, leadtext, media, language}) => {
    const classes = useStyles()

    const localeId = "locale:" + language;

    if (typeof title === "object") {
        title = title[localeId] || undefined
    }
    
    if (typeof leadtext === "object") {
        leadtext = leadtext[localeId] || undefined
    }

    return (
        <header className={classes.header}>
            <Typography variant="h2">{title}</Typography>
            { media && <PageMedia {...media} /> }
            <Typography>{leadtext}</Typography>
        </header>
    )

}

export default PageHeader