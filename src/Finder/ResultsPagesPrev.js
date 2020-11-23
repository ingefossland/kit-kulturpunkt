import React  from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
    button: {
        fontFamily: "Akkurat, sans-serif",
        minHeight: theme.spacing(7),
        marginBottom: theme.spacing(1)
    }
}));

const ResultsPagesPrev = ({resultsByPage = {}, pages, page, onPage}) => {
    const { t, i18n } = useTranslation(['search']);

    const classes = useStyles()

    let prevPage

    for (let p = page; p >= 1; p--) {
        if (!resultsByPage[p]) {
            prevPage = p
            break
        }
    }    

    if (!prevPage) {
        return false
    }

    const label = t('Prev page') + " ..."

    return (
        <Button className={classes.button} fullWidth={true} variant="outlined" color="primary" size="large" onClick={() => onPage(prevPage)}>{label}</Button>
    )    
}

export default ResultsPagesPrev;