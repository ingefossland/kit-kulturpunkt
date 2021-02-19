import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from "prop-types"

import NavSettings from "../NavSettings/NavSettings"
import NavToolbar from "../NavToolbar/NavToolbar"

const useStyles = makeStyles(theme => ({
    actionbar: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    settings: {
        display: "flex",
        alignItems: "center",

        "& > * + *": {
            marginLeft: theme.spacing(-1)
        },

    },
    toolbar: {
        display: "flex",
        alignItems: "center",

        "& > * + *": {
            marginLeft: theme.spacing(-1)
        },

        "& button": {
            opacity: .5,

            "&:hover": {
                opacity: 1
            }

        }        


    },
}));


const ModuleActionbar = ({ className, settings, toolbar, children, ...props }) => {
    const classes = useStyles()

    if (children) {
        return (
            <div className={className || classes.actionbar}>
                {children}
            </div>
        )    
    }

    return (
        <div className={className || classes.actionbar}>
            <NavSettings className={classes.settings} settings={settings} />
            <NavToolbar {...props} className={classes.toolbar} toolbar={toolbar} />
        </div>
    )    

}

ModuleActionbar.propTypes = {
    settings: PropTypes.array,
    toolbar: PropTypes.array
}

export default ModuleActionbar;
