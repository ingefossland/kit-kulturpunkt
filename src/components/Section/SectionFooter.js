import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    footer: {
        paddingLeft: props => { return theme.spacing(props.padding) },
        paddingRight: props => { return theme.spacing(props.padding) },
        paddingBottom: props => { return theme.spacing(props.padding) },
    }
}));

const SectionFooter = ({className, padding = 2, children}) => {
    const classes = useStyles({padding});

    if (!children) {
        return false
    }

    return (
        <footer className={className || classes.footer}>
            { children }
        </footer>
    )

}

export default SectionFooter;
