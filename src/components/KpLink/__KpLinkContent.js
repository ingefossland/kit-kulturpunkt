import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { NavSettings } from "@frontend-components/admin"

const useStyles = makeStyles(theme => ({
    content: {
        position: "relative",

        "& [data-name=description]": {
            marginTop: theme.spacing(2)
        }

    },
    navSettings: {
        position: "absolute",
        zIndex: 2,
        top: 0,
        right: 0,
        margin: theme.spacing(.75)
    }
}));

const KioskLinkContent = ({spacing = 2, settings, children, ...props}) => {
    const classes = useStyles()

    return (
        <section className={classes.content} data-name="content">
            {children}
            <NavSettings className={classes.navSettings} settings={settings} />
        </section>
    )
    
}

export default KioskLinkContent