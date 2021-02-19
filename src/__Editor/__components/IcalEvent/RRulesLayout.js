import React, { useState } from "react"
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import ButtonCollapsible from "./ButtonCollapsible"

const useStyles = makeStyles(theme => ({
    fieldset: {
        border: "1px solid",
        borderColor: theme.palette.divider,

        "& $body": {
            display: "none"
        },
        
        "&[aria-expanded=true]": {
            "& $body": {
                display: "block",
                borderTop: "1px solid",
                borderColor: theme.palette.divider,
            }
        }

    },
    header: {
        display: "flex",
        margin: theme.spacing(2),

        "& + $body": {
            borderTop: "1px solid",
            borderColor: theme.palette.divider,
        }
    },
    button: {
        width: theme.spacing(2),
        height: theme.spacing(2),
        marginRight: theme.spacing(1),
    },
    description: {
    },
    body: {
        margin: theme.spacing(2)
    }
}));

const RRulesLayout = ({title, description, children, hidden, expanded, onToggle, ...props}) => {

    const classes = useStyles()

    if (hidden) {
        return false
    }

    return (
        <div className={classes.fieldset} aria-expanded={expanded}>

                <header className={classes.header} onClick={onToggle}>
                    <ButtonCollapsible expanded={expanded} className={classes.button} />
                    <Typography className={classes.description}><strong>{title || "Sett opp regler"}</strong> {description && "("+description+")"}</Typography>
                </header>

            <div className={classes.body}>
                {children}
            </div>

        </div>
    )

}

RRulesLayout.defaultProps = {
}

export default RRulesLayout