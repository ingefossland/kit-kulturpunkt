import React from 'react';
import PropTypes from "prop-types"
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import ViewOptions from "./ViewOptions"

const useStyles = makeStyles(theme => ({
    header: {
        display: "flex",
        alignItems: "baseline",
        fontFamily: "Akkurat, sans-serif",
        fontSize: "14px",
        "& * + *": {
            marginLeft: theme.spacing(.5)
        },
        marginBottom: theme.spacing(1)
    },
    title: {
        fontFamily: "Akkurat, sans-serif",
        fontSize: "14px",
        fontWeight: "bold",
        color: theme.palette.text.primary,
    },
    description: {
        fontFamily: "Akkurat, sans-serif",
        fontSize: "14px",
        color: theme.palette.text.secondary,
    }
}));

const ViewHeader = ({
    title,
    description, 
    sortOptions, sort, onSort, 
    rowsOptions, rows, onRows, 
}) => {

    const classes = useStyles()

    return (
        <header className={classes.header}>
            <span className={classes.title}>{title}</span>
            { sortOptions && <i>– <ViewOptions options={sortOptions} value={sort} onChange={onSort} /></i> }
            { rowsOptions && <i>– <ViewOptions options={rowsOptions} value={rows} onChange={onRows} /></i> }
            { description && <span className={classes.description}>– {description}</span> }
        </header>
    )

}

ViewHeader.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    sortOptions: PropTypes.array,
    sort: PropTypes.string,
    onSort: PropTypes.func,
    rowsOptions: PropTypes.array,
    rows: PropTypes.number,
    onRows: PropTypes.func
}

export default ViewHeader