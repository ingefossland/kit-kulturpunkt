import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        alignItems: "baseline",
        fontFamily: "Akkurat, sans-serif",
        fontSize: "14px",
        color: theme.palette.text.primary,
        "& * + *": {
            marginLeft: theme.spacing(.5)
        },
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        borderTop: "1px solid",
        borderColor: theme.palette.divider,
        paddingTop: theme.spacing(1)
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

const ResultsHeader = ({resultsLoaded = [], count, start, rows, pages, page, onPage}) => {
    const { t, i18n } = useTranslation('search');

    rows = resultsLoaded.length;

    let title;

    if (count > rows) {
        title = t('{{rows}} of {{count}} hits', { pages, page, count,rows });
    } else {
        title = t('{{count}} hits', { pages, page, count, rows });
    }
    
    const classes = useStyles()

    return (
        <header className={classes.root}>
            <Typography className={classes.title}>{title}</Typography>
        </header>
    )

}

export default ResultsHeader