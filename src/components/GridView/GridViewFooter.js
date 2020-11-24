import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { NavPages } from ".."

const useStyles = makeStyles(theme => ({
    footer: {
        paddingTop: theme.spacing(1)
    },
    title: {
        fontFamily: "Akkurat, sans-serif",
        fontSize: "14px",
        fontWeight: "bold",
        color: theme.palette.text.secondary
    }
}));

const ResultsPages = ({models = [], count, start, rows, pages, page, onPage}) => {
    const { t, i18n } = useTranslation('search');

    const classes = useStyles()

    if (pages < 2) {
        return false
    }

    return (
        <footer className={classes.footer}>
            <NavPages count={pages} page={page} onChange={onPage} />
        </footer>
    )

}

export default ResultsPages