import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    sectionBody: {
        position: props => { return props.position },
        top: props => { return props.top },
        right: props => { return props.right },
        bottom: props => { return props.bottom },
        left: props => { return props.left },

        margin: props => { return props.position === "absolute" && theme.spacing(props.padding) },
        marginTop: props => { return props.position === "absolute" && theme.spacing(8) },

        paddingLeft: props => { return theme.spacing(props.padding) },
        paddingRight: props => { return theme.spacing(props.padding) },
        paddingBottom: props => { return theme.spacing(props.padding) },
        "& > * + *": {
            marginTop: props => { return theme.spacing(props.spacing) },
        }
    },
}));


const SectionBody = ({className, position = "relative", grid = false, padding = 2, spacing = 0, children, ...props}) => {

    if (position === "absolute") {
        props.top = 0
        props.right = 0
        props.bottom = 0
        props.left = 0
    }

    const classes = useStyles({position, padding, spacing, ...props});

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
