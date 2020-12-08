import React, { forwardRef, useState, useEffect, useRef } from 'react';
import PropTypes from "prop-types"
import { Dropdown } from "@kit-ui/core"

import Typography from "@material-ui/core/Typography"

import IconButton from "@material-ui/core/IconButton"
import CloseIcon from "@material-ui/icons/Close"

import { makeStyles } from '@material-ui/core/styles';

import { utils } from "@rjsf/core";
const { getUiOptions, getDefaultFormState } = utils;

const useStyles = makeStyles(theme => ({
    overlay: {
        position: "fixed",
        backgroundColor: "rgba(0,0,0,.25)",
        zIndex: 3000,
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    },
    header: {
        height: theme.spacing(6),
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: theme.spacing(2)
    },
    editor: {
        backgroundColor: theme.palette.background.default,
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        margin: theme.spacing(4)
    },
    closeButton: {
    },
    icon: {
        width: 20,
        height: 20,
//        borderRadius: "50%",
        border: "1px solid",
        borderColor: theme.palette.divider,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
//        boxShadow: theme.shadows[1]
    },
    label: {
        fontFamily: "Akkurat, sans-serif",
        fontSize: 11,
        textTransform: "uppercase",
        fontWeight: "bold",
        lineHeight: '1',
        textAlign: "center",
    }    
}));

const LocalizedStringSettings = (props) => {

    const { name, schema, formContext } = props;

    const languages = formContext.languages || ["en"];
    const defaultLocale = formContext.defaultLocale || languages[0]
    const currentLocale = formContext.currentLocale || defaultLocale

    const [expanded, setExpanded] = useState(false);
    const anchorRef = useRef(null)

    const _onExpand = (event) => {
        setExpanded(prevExpanded => !prevExpanded);
    }

    const _onCollapse = (event) => {
        setExpanded(false);
    };

    const classes = useStyles()

    const { ObjectField } = props.registry.fields

    const uiSchema = {
        "ui:options": {
            "padding": 2,
            "spacing": 2
        }
    }

    const uiOptions = getUiOptions(props.uiSchema)
    const title = uiOptions.title || name

    const Overlay = ({expanded, children}) => {

        if (!expanded) {
            return false
        }

        return (
            <div className={classes.overlay}>

                <div className={classes.editor}>

                    <header className={classes.header}>
                        <Typography>{title}</Typography>
                        <IconButton className={classes.closeButton} onClick={() => _onCollapse()}>
                            <CloseIcon></CloseIcon>
                        </IconButton>
                    </header>

                    {children}
                </div>

            </div>
        )

    }

    return (
        <IconButton>
            <div className={classes.icon}>
                <div className={classes.label}>{currentLocale}</div>
            </div>
        </IconButton>
    )

    return (
        <React.Fragment>
            <IconButton onClick={_onExpand} ref={anchorRef}>
                <div className={classes.icon}>
                    <div className={classes.label}>{currentLocale}</div>
                </div>
            </IconButton>
            <Overlay expanded={expanded} anchorEl={anchorRef.current} onClickAway={_onCollapse}>
                <ObjectField {...props} uiSchema={uiSchema} />
            </Overlay>
        </React.Fragment>
    )

}

LocalizedStringSettings.defaultProps = {
}

LocalizedStringSettings.propTypes = {
}

export default LocalizedStringSettings;