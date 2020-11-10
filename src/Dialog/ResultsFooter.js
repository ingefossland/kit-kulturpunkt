import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import ButtonBase from '@material-ui/core/ButtonBase';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import MoreIcon from '@material-ui/icons/MoreHoriz';

const useStyles = makeStyles(theme => ({
    footer: {
        position: "relative",
        width: "100%",
        minHeight: theme.spacing(16),

        display: "flex",
        alignItems: "center",
        justifyContent: "center",

    },
    button: {
        flexGrow: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",

        "&:hover": {
            cursor: "pointer"
        },

        /*
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        */
        border: "1px solid",
        borderColor: theme.palette.divider,
        backgroundColor: theme.palette.background.default,
        backgroundColor: "#eee",
        color: theme.palette.text.secondary,

        minHeight: theme.spacing(12),
        padding: 0,
        margin: theme.spacing(2),

        "& > *": {
            margin: theme.spacing(.5)
        },

    },
    label: {
        fontFamily: "Akkurat, sans-serif",
        fontSize: "14px",
        fontWeight: "normal"
    },

}));

const ResultsFooter = ({start, rows, count, page, pages, nextPage, onPage}) => {
    const { t, i18n } = useTranslation(['search']);
    const classes = useStyles()

    if (!nextPage) {
        return false
    }

    const from = start+rows+1
    const to = from+rows-1

    const label = t('Get results {{from}}–{{to}}', {from, to}) + " ..."

    return (
        <footer className={classes.footer}>
            <Paper elevation={1} square={true} component="button" className={classes.button} onClick={() => onPage(nextPage)}>
                {/* <MoreIcon className={classes.icon} /> */}
                <Typography className={classes.label}>{label}</Typography>
            </Paper>
        </footer>
    )    
}

export default ResultsFooter;