import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    sectionBody: {

        paddingLeft: props => { return theme.spacing(props.padding) },
        paddingRight: props => { return theme.spacing(props.padding) },
        paddingBottom: props => { return theme.spacing(props.padding) },
        "& > * + *": {
            marginTop: props => { return theme.spacing(props.spacing) },
        }
    },
}));


const SectionBody = ({className, padding = 0, spacing = 0, children, ...props}) => {

    const classes = useStyles({padding, spacing});

    if (!children) {
        return ""
    }

    return (
        <div className={className || classes.sectionBody}>
            {children}
        </div>
    )

}

export default SectionBody;
