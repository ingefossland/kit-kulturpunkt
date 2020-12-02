import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        position: "absolute",
        zIndex: 1,
        width: "100%",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        overflowY: "scroll",
        padding: props => { return theme.spacing(props.padding) }
    },
    body: {
        display: "block",
        width: "100%",
        paddingTop: theme.spacing(8),
        paddingRight: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        paddingLeft: theme.spacing(2),
    }
}));

const FinderBody = ({padding = 2, children}) => {
    const classes = useStyles({padding})

    return (
        <div>
            {children}
        </div>
    )

}

export default FinderBody;