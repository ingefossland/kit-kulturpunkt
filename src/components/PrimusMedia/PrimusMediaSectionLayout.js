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

        paddingLeft: props => { return theme.spacing(props.padding) },
        paddingRight: props => { return theme.spacing(props.padding) },

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

        "&[aria-expanded=true]": {
            minHeight: theme.spacing(8)
        },


    },
    title: {
        fontFamily: "Akkurat, sans-serif",
        fontSize: 18,
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
    body: {

        "& > * + *": {
            marginTop: props => { return theme.spacing(props.spacing) },
        }

    },
    footer: {
        marginTop: props => { return theme.spacing(props.spacing) },
        marginBottom: props => { return theme.spacing(props.spacing) },
    },
    buttongroup: {
        display: "flex",
        margin: theme.spacing(-1),

        "& > $button": {
            margin: theme.spacing(1),
        }
    },
    button: {
        fontFamily: "Akkurat, sans-serif",
        fontSize: 14,
        fontWeight: "bold",
        textTransform: "none",
        letterSpacing: 0,
        borderRadius: 1,
        padding: theme.spacing(2),
        minWidth: theme.spacing(16),
        minHeight: theme.spacing(7),
    },

}));

const PrimusSectionLayout = ({currentId, id, sortableHandle, collapsible, expanded, onExpand, onAdd, onDelete, onCollapse, padding = 2, spacing = 2, title = "Section", description, children}) => {
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
                {!expanded && sortableHandle}
                <Typography className={classes.title}>{title}</Typography>
                {description && <Typography className={classes.description}>{description}</Typography> }
            </header>

            { expanded && 
                <div className={classes.body}>
                {children}
                </div> }

            { collapsible && expanded && 
                <footer className={classes.footer}>
                    <div className={classes.buttongroup}>
                        <Button variant="outlined" className={classes.button} onClick={onCollapse}>Lagre og lukk</Button>
                        <Button variant="outlined" className={classes.button} onClick={onDelete}>Slett</Button>
                    </div>
                </footer>
            }

            { onAdd && 
                <footer className={classes.footer}>
                    <div className={classes.buttongroup}>
                        <Button variant="outlined" className={classes.button} onClick={onAdd}>Legg til</Button>
                    </div>
                </footer>
            }

 
        </section>
    )

}

export default PrimusSectionLayout