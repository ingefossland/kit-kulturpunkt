import React, { forwardRef, useState, useEffect, useRef } from 'react';
import PropTypes from "prop-types"
import { Dropdown } from "@kit-ui/core"
import { getUiOptions, getDefaultFormState } from "../utils"

import IconButton from "@material-ui/core/IconButton"

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    button: {

    },
    icon: {
        width: 20,
        height: 20,
        border: "1px solid",
        borderColor: theme.palette.divider,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    label: {
        fontFamily: "Akkurat, sans-serif",
        fontSize: 12,
        textTransform: "uppercase",
        fontWeight: "bold",
        lineHeight: 1,
        textAlign: "center",
    }    
}));

const LocalizedStringSettings = (props) => {

    const { schema, uiSchema, formData, formContext } = props;
    const uiOptions = getUiOptions(uiSchema)

    const languages = formContext.languages || ["en"];
    const defaultLocale = formContext.defaultLocale || languages[0]
    const currentLocale = formContext.currentLocale || defaultLocale

    const [expanded, setExpanded] = useState(false);
    const anchorRef = useRef(null)

    const _onToggle = (event) => {
        setExpanded(prevExpanded => !prevExpanded);
    }

    const _onCollapse = (event) => {
        setExpanded(false);
    };

    const classes = useStyles()

    return (
        <React.Fragment>
            <IconButton className={classes.button} onClick={_onToggle} ref={anchorRef}>
                <div className={classes.icon}>
                    <div className={classes.label}>{currentLocale}</div>
                </div>
            </IconButton>
            <Dropdown expanded={expanded} anchorEl={anchorRef.current} onClickAway={_onCollapse}>
                {JSON.stringify(formData)}
            </Dropdown>
        </React.Fragment>
    )

}

LocalizedStringSettings.defaultProps = {
}

LocalizedStringSettings.propTypes = {
}

export default LocalizedStringSettings;