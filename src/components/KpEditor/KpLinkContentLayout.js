import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    content: {
        marginTop: theme.spacing(7)
    },
}));

const KpLinkContentLayout = ({children}) => {

    const classes = useStyles()

    return (
        <div className={classes.content}>
            {children}
        </div>
    )

}

export default KpLinkContentLayout