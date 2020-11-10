import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        paddingLeft: props => { return theme.spacing(props.padding) },
        paddingRight: props => { return theme.spacing(props.padding) },
        paddingBottom: props => { return theme.spacing(props.padding) },
    },
    grid: {
        display: "grid",
        gridTemplateColumns: "200px auto",
        gridGap: props => { return theme.spacing(props.spacing) },

        "& [data-name=media]": {
            minWidth: theme.spacing(25),
            minHeight: theme.spacing(25),
        },        

        "& [data-name=content]": {
        },        

        "& [data-name=reference]": {
            gridColumn: "1 / span 2",
        }        
        
    }
}));

const KioskLink = ({padding = 2, spacing = 2, children}) => {

    const classes = useStyles({padding, spacing})

    return (
        <section className={classes.root}>
            <div className={classes.grid}>
                {children}
            </div>
        </section>
    )

}

export default KioskLink