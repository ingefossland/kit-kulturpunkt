import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
    ModuleBase,
    ModuleFormat,
    ModuleHeader,
    ModuleBody,
    ModuleFooter,
    ModuleButtons,
} from "@kit-ui/admin"

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    module: {
        position: "relative",
        zIndex: 2,

        "& + *": {
            zIndex: 1
        },

        display: "flex",
        flexDirection: "column",
        minHeight: props => { return props.minHeight }

    },
    header: {
        position: "absolute",
        zIndex: 2,
        top: 0,
        right: 0,
        bottom: "auto",
        left: 0,
        display: "flex",
        zIndex: 2,
        alignItems: "center",
        justifyContent: "flex-start",
        height: theme.spacing(6),
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        color: "inherit",

        "& + *": {
            zIndex: 1,
            marginTop: theme.spacing(6)
        }

    },
    body: {
        position: "relative",
        flexGrow: 1,
        padding: theme.spacing(2)
    },
    footer: {
        borderTop: "1px solid",
        borderColor: theme.palette.divider,
        padding: props => { return theme.spacing(props.padding) }
    }

}));

const ExpandedModule = ({id, children, buttons, ...props }) => {
    const classes = useStyles(props)

    return (
        <ModuleBase className={classes.module} id={id} expanded={true} elevation={4}>
            <ModuleFormat {...props}>
                <ModuleHeader {...props} className={classes.header} />
                <ModuleBody className={classes.body}>
                    {children}
                </ModuleBody>
            </ModuleFormat>
            <ModuleFooter {...props} className={classes.footer}>
                {buttons && <ModuleButtons buttons={buttons} />}
            </ModuleFooter>
        </ModuleBase>
    )    

}

ExpandedModule.propTypes = {
    title: PropTypes.string,
    menu: PropTypes.array,
    buttons: PropTypes.array,
    children: PropTypes.node
}

export default ExpandedModule;
