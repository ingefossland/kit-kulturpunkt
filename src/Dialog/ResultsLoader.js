import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(theme => ({
    loader: {
        display: "flex",
        alignItems: "baseline",
        color: theme.palette.text.secondary,
        margin: theme.spacing(2),
    },
    title: {
        fontFamily: "Akkurat, sans-serif",
        fontSize: "14px",
        color: theme.palette.text.primary
    }
}));

const ResultsLoader = ({query = {}, results = {}, children}) => {
    const { t, i18n } = useTranslation('search');

    const classes = useStyles()

    const { models = [], count, rows } = results

    let title;

    const q = query.q && query.q.replace('*', '')

    if (rows && !count) {
        title = t('No hits')
    } else if (!models.length) {
        title = t('Searching, please wait', {q}) + "...";
    }

    if (title) {
        return (
            <div className={classes.loader}>
                <Typography className={classes.title}>{title}</Typography>
            </div>
        )
    }

    return children

}

export default ResultsLoader