import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    section: {
//        position: "relative",
        
//        marginBottom: props => { return theme.spacing(props.spacing)},

        "& > header": {
            position: "sticky",
            zIndex: 2,
            top: 0,
        }

    },
    header: {
        display: "flex",
        width: "100%",
        alignItems: "baseline",
    },
    title: {
        display: "inline",
        fontSize: "14px",
        fontWeight: "bold",
    },
    description: {
        display: "inline",
        fontSize: "14px",
        fontWeight: "normal",
    },
}));

const FinderSection = ({expanded = true, spacing = 2, title, description, action = [], children}) => {

    const classes = useStyles({spacing})

    const renderHeader = () => {

        if (title) {
            return (
                <header className={classes.header}>
                    <div className={classes.leading}>
                        <Typography className={classes.title} nowrap>{title}</Typography>
                        { description &&  <Typography className={classes.description}>{description}</Typography> }
                    </div>
                </header>
            )
        }
        
    }

    return (
        <div className={classes.section} aria-expanded={expanded}>
            { renderHeader() }
            { expanded && children }
        </div>
    )

}

export default FinderSection;