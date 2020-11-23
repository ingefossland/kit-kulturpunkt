import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
    button: {
        fontFamily: "Akkurat, sans-serif",
        minHeight: theme.spacing(7),
        marginTop: theme.spacing(1)
    }
}));

const ResultsFooter = ({resultsByPage = {}, pages, page, onPage}) => {
    const { t, i18n } = useTranslation(['search']);

    const classes = useStyles()

    let nextPage

    for (let p = page; p <= pages; p++) {
        if (!resultsByPage[p]) {
            nextPage = p
            break
        }
    }    

    if (!nextPage) {
        return false
    }

    const label = t('Next page') + " ..."

    return (
        <Button className={classes.button} fullWidth={true} variant="outlined" color="primary" size="large" onClick={() => onPage(nextPage)}>{label}</Button>
    )    
}

export default ResultsFooter;