import React from "react"

import CC from "./icons/CC"
import By from "./icons/By"
import Nd from "./icons/Nd"
import Nc from "./icons/Nc"
import Sa from "./icons/Sa"
import Pd from "./icons/Pd"
import Pdm from "./icons/Pdm"
import Copyright from "./icons/Copyright"

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    icons: {
        display: "flex",
        alignItems: "center",
        "& * + *": {
            marginLeft: theme.spacing(.5)
        }
    },
    icon: {
        fontSize: "inherit",
        fill: "currentColor",
        "& *": {
            fill: "currentColor"
        }
    }
}))

const icons = {
    "cc": CC,
    "by": By,
    "nd": Nd,
    "nc": Nc,
    "sa": Sa,
    "pd": Pd,
    "pdm": Pdm,
    "copyright": Copyright,
}

const LicenseIcons = ({className, value}) => {

    const licenses = value && value.split('-') || value && [value]

    const classes = useStyles()

    let licenseIcons = []

    licenses && licenses.map(license => {

        const icon = icons && icons[license]

        if (icon) {
            licenseIcons.push(icon)
        }

    })

    if (!licenseIcons.length) {
        return false
    }

    return (
        <div className={className || classes.icons}>
            {licenseIcons.map((Icon, index) => <Icon className={classes.icon} key={index} /> )}
        </div>
    )



}

export default LicenseIcons