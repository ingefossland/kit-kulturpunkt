import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(theme => ({
    header: {
        display: "flex",
        alignItems: "baseline",
        fontFamily: "Akkurat, sans-serif",
        fontSize: "14px",
        color: theme.palette.text.primary,
        "& * + *": {
            marginLeft: theme.spacing(.5)
        },
        marginBottom: theme.spacing(1)
    },
    title: {
        fontFamily: "Akkurat, sans-serif",
        fontSize: "14px",
        fontWeight: "bold"
    },
    description: {
        fontFamily: "Akkurat, sans-serif",
        fontSize: "14px",
    }
}));

const ResultsHeader = ({models = [], count, start, rows, pages, page, resultsTitle}) => {
    const { t, i18n } = useTranslation('search');

    const from = start + 1;
    const to = start + models.length;

    const title = resultsTitle || t('{{count}} hits', { pages, page, count, from, to, rows });
    const description = t('{{page}} of {{pages}} pages', { pages, page, count, from, to, rows });
    
    const classes = useStyles()

    return (
        <header className={classes.header}>
            <Typography className={classes.title}>{title}</Typography>
            { pages > 1 && <i>–</i> }
            { pages > 1 && <Typography className={classes.description}>{description}</Typography> }
        </header>
    )

}

export default ResultsHeader