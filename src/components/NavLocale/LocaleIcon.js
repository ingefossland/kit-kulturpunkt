import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    icon: {
        display: 'flex',
        alignItems: "center",
        justifyContent: "center",
        fontSize: 24,
        width: '1.25em',
        height: '1.25em',
        border: "1px solid",
        borderColor: "#ccc",
        margin: "-0.125em"
    },
    label: {
        fontFamily: "Akkurat, sans-serif",
        fontSize: '0.5em',
        fontWeight: "bold",
        textTransform: "uppercase",
        lineHeight: '1',
        textAlign: "center",
    }
}));

const LocaleIcon = ({value}) => {
    const classes = useStyles()
    return (
        <div className={classes.icon}>
            <b className={classes.label}>{value}</b>
        </div>
    )
}

export default LocaleIcon;