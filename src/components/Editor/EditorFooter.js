import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import EditorStatus from "./EditorStatus"
import EditorAction from "./EditorAction"

const useStyles = makeStyles(theme => ({
    root: {
        position: "absolute",
        zIndex: 3,

        top: "auto",
        right: 0,
        bottom: 0,
        left: 0,

//        backgroundColor: theme.palette.primary.main,
//        color: theme.palette.primary.contrastText,

        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: theme.spacing(7),
        fontSize: "16px",

        [theme.breakpoints.up('sm')]: {
            display: "none",
        }
    },
    status: {
        display: "flex",
        alignItems: "center",
        height: theme.spacing(5),
        minWidth: theme.spacing(14),
        justifyContent: "center",
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        paddingRight: theme.spacing(3),
        paddingLeft: theme.spacing(3),
        fontSize: "14px",
        opacity: 0.5
    },
    action: {
        borderLeft: "1px solid",
        borderColor: "rgba(255,255,255,0.25)",

        "& > *": {
            height: theme.spacing(7),
        },

        "& button": {
            paddingLeft: theme.spacing(1),
            paddingRight: theme.spacing(1),
            height: theme.spacing(7),
            minWidth: theme.spacing(7),
        }

    }
}));

const EditorFooter = ({className, id, elevation = 6, ...props}) => {
    const classes = useStyles()

    return (
        <AppBar component="footer" elevation={elevation} square={true} className={className || classes.root}>
            <Toolbar>
                <EditorStatus {...props} className={classes.status} />
                <EditorAction {...props} className={classes.action} />
            </Toolbar>
        </AppBar>
    )

}

export default EditorFooter;