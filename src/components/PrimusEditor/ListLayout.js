import React from "react"
import { makeStyles } from '@material-ui/core/styles';

import IconButton from '@material-ui/core/IconButton';
import ToggleIcon from '@material-ui/icons/MoreHoriz';

import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';

import ButtonGroup from "@material-ui/core/ButtonGroup"
import Button from "@material-ui/core/Button"

const useStyles = makeStyles(theme => ({
    fieldset: {
        borderTop: "1px solid",
        borderColor: theme.palette.divider,
        paddingTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
//        padding: theme.spacing(2),
    },
    header: {
        display: "flex",
        alignItems: "center",
        fontFamily: "Akkurat, sans-serif",
    },
    title: {
//        fontWeight: "bold"
    },
    description: {
        textDecoration: "underline",
        marginLeft: theme.spacing(1)
    },
    body: {
        display: "flex",
        flexDirection: "column",
        marginTop: theme.spacing(2),
    },
    toggleIcon: {
        transition: ".125s ease-in-out",
        transform: "rotate(0deg)",

        marginRight: theme.spacing(1),

        "&[aria-expanded=true]": {
            transition: ".125s ease-in-out",
            transform: "rotate(90deg)"
        }
    }


}));

const DatingLayout = ({collapsible, expanded, onToggle, title = "Dating", description, children, buttons}) => {

    const classes = useStyles()

    if (!collapsible) {
        expanded = true
    }

    const FieldsetButton = ({icon = "add", label, title, color="primary", variant="outlined", size="large", ...props}) => {
        
        return (
            <Button {...props} type="button" data-size={size} data-variant={variant} disableElevation={true} color={color} variant={variant} size={size} className={classes.button}>
                {title || label }
            </Button>
        )
    
    }

    return (
        <div className={classes.fieldset}>
            <FormLabel className={classes.header} component="legend" onClick={onToggle}>
                <ToggleIcon className={classes.toggleIcon} aria-expanded={expanded} />

                <span className={classes.title}>
                    {title}
                </span>
                {!expanded && <span className={classes.description}>{description}</span> }
            </FormLabel>

            { expanded && children && <FormGroup className={classes.body}>{children}</FormGroup> }

            { expanded && buttons && (
                <ButtonGroup color="primary" className={classes.buttongroup}>
                { buttons.map((button, index) => <FieldsetButton {...button} key={index} /> ) }
                </ButtonGroup>
            )}

 
        </div>
    )

}

export default DatingLayout