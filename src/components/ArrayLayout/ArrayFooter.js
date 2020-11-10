import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    footer: {
        marginTop: theme.spacing(2)
    }
}));

const ArrayFooter = ({className, padding = 2, children}) => {
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

export default ArrayFooter;