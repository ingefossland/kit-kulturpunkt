import React, { useRef, useEffect } from "react"
import Typography from '@material-ui/core/Typography';
import ButtonGroup from "@material-ui/core/ButtonGroup"
import Button from '@material-ui/core/Button';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    section: {
        padding: 0,
        margin: 0,

        "&[data-collapsible=true]": {
            borderTop: "1px solid",
            borderColor: theme.palette.divider,
        },

        marginTop: 0,

        "&[aria-expanded=true]": {
            marginBottom: props => { return theme.spacing(props.spacing) },
        },

        "& $section": {
            paddingLeft: 0,
            paddingRight: 0,
            margin: 0
        },

    },
    header: {
        display: "flex",
        alignItems: "center",
        minHeight: theme.spacing(7),
        userSelect: "none",

        paddingLeft: props => { return theme.spacing(props.padding) },
        paddingRight: props => { return theme.spacing(props.padding) },

        "&[aria-expanded=true]": {
            minHeight: theme.spacing(8)
        },


    },
    title: {
        fontFamily: "Akkurat, sans-serif",
        fontSize: 18,
        color: theme.palette.text.primary,
        letterSpacing: 0,

        "&[data-untitled=true]": {
            color: theme.palette.text.secondary
        }
    },
    description: {
        fontFamily: "Akkurat, sans-serif",
        fontSize: 16,
        letterSpacing: 0,
        color: theme.palette.text.secondary,
        marginLeft: theme.spacing(1)
    },
    helperText: {
        fontFamily: "Akkurat, sans-serif",
        fontSize: 14,
        letterSpacing: 0,
        color: theme.palette.text.secondary,
        marginLeft: theme.spacing(1)
    },
    body: {

    },
    footer: {
        paddingLeft: props => { return theme.spacing(props.padding) },
        paddingRight: props => { return theme.spacing(props.padding) },
        marginTop: props => { return theme.spacing(props.spacing) },
        marginBottom: props => { return theme.spacing(props.spacing) },
    },


}));

const PrimusSectionLayout = ({currentId, id, collapsible, expanded, onExpand, onAdd, onDelete, onCollapse, padding = 2, spacing = 2, title = "Section", description, children}) => {
    const classes = useStyles({collapsible, padding, spacing})
    const ref = useRef(null)

    useEffect(() => {
        if (currentId === id) {
            ref.current.scrollIntoView({behavior: 'smooth'}) 
        }
    }, [currentId])

    if (!collapsible) {
        expanded = true
    }

    return (
        <section aria-expanded={expanded} data-collapsible={collapsible} ref={ref} id={id} className={classes.section}>

            <header className={classes.header} onClick={collapsible && onExpand}>
                <Typography className={classes.title}>{title}</Typography>
                {description && <Typography className={classes.description}>{description}</Typography> }
            </header>

            <div className={classes.body}>
            {children}
            </div>

            <footer className={classes.footer}>
                <Typography className={classes.helperText}>Klikkk på bildet for å legge til en markering.</Typography>
            </footer>

 
        </section>
    )

}

export default PrimusSectionLayout