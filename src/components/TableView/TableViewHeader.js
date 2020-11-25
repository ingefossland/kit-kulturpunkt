import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';

import { NavSort } from ".."

import ListViewOptions from "./ListViewOptions"

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

const ResultsHeader = ({
    models = [], 
    count, start, 
    pages, page, 
    sortOptions, sort, onSort, 
    rowsOptions, rows, onRows, 
    ...props
}) => {

    const { t, i18n } = useTranslation('search');

    const from = start + 1;
    const to = start + models.length;

    const title = props.title || t('{{count}} hits', { pages, page, count, from, to, rows });
    const description = t('{{page}} of {{pages}} pages', { pages, page, count, from, to, rows });
    
    const classes = useStyles()

    return (
        <header className={classes.header}>
            <Typography className={classes.title}>{title}</Typography>
            { sortOptions && sort && <i>– <ListViewOptions options={sortOptions} value={sort} onChange={onSort} /></i> }
            { rowsOptions && rows && <i>– <ListViewOptions options={rowsOptions} value={rows} onChange={onRows} /></i> }
            { pages > 1 && <i>–</i> }
            { pages > 1 && <Typography className={classes.description}>{description}</Typography> }
        </header>
    )

}

export default ResultsHeader