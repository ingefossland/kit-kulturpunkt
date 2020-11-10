import React from "react"
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    body: {
        margin: theme.spacing(2)
    },
}));

const PageHeader = ({bodytext, language}) => {
    const classes = useStyles()

    const localeId = "locale:" + language;

    if (typeof bodytext === "object") {
        bodytext = bodytext[localeId] || undefined
    }

    return (
        <div className={classes.body}>
            <Typography>{bodytext}</Typography>
        </div>
    )

}

export default PageHeader