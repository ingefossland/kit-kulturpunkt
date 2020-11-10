import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from "prop-types"

import ListSettings from "./ListSettings"
import GridSettings from "./GridSettings"

const templates = {
    "list": ListSettings,
    "grid": GridSettings,
}

const useStyles = makeStyles(theme => ({
    settings: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "nowrap"
    }
}));

/** NavSettings renders settings with options. Each setting should have an onChange function. */

const NavSettings = ({className, settings = []}) => {
    const classes = useStyles()

    if (!settings.length) {
        return false
    }

    const renderSettings = ({template, ...props}, index) => {

        let SettingsTemplate

        if (template && typeof template === "function") {
            SettingsTemplate = template
        } else if (template && templates[template]) {
            SettingsTemplate = templates[template]
        } else {
            SettingsTemplate = ListSettings
        }

        return <SettingsTemplate {...props} key={index} />
            
    }
    
    return (
        <div className={className || classes.settings}>
            { settings && settings.map((settingsProps, index) => {
                return renderSettings(settingsProps)
            })}
        </div>
    )

}

NavSettings.propTypes = {
    settings: PropTypes.array,
}

export default NavSettings;
