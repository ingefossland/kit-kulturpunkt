import React from 'react';
import PropTypes from 'prop-types';
import Badge from '@material-ui/core/Badge';

import ListModule from "../KpView/ListModule"

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

const KpLinkLayout = ({
    editable,
    expanded,
    buttons,
    onCollapse,
    children,
    ...props
}) => {

    const classes = useStyles(props)

    if (editable && expanded) {

        if (!buttons || !buttons.length) {
            buttons = [
                {
                    title: "Save",
                    onClick: onCollapse
                }
            ]
        }

        return (
            <ModuleBase className={classes.module} expanded={true} elevation={4}>
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

    const StartAdornment = ({startAdornment, badgeContent}) => {

        return (
            <Badge className={classes.badge} badgeContent={badgeContent} color="primary">
                {startAdornment}
            </Badge>
        )
    
    }
    

    return (
        <ListModule
            {...props}
            primaryButton={<StartAdornment {...props} />}
            editable={editable}
        />
    )

}

KpLinkLayout.defaultProps = {
    padding: 2,
    editable: true
}

KpLinkLayout.propTypes = {
    editable: PropTypes.bool,
    editing: PropTypes.bool
}

export default KpLinkLayout;
