import React, { useRef, useEffect } from "react"
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    section: {
        padding: 0,
        margin: 0,

        "&[data-collapsible=true]": {
            borderTop: "1px solid",
            borderColor: theme.palette.divider,
        },

//        paddingLeft: props => { return theme.spacing(props.padding) },
//        paddingRight: props => { return theme.spacing(props.padding) },

        marginTop: 0,

        "&[aria-expanded=true]": {
            marginBottom: props => { return theme.spacing(props.spacing) },
        },

        "& $section": {
            paddingLeft: 0,
            paddingRight: 0,
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
        fontSize: "18px",
        letterSpacing: 0,

        "&[data-untitled=true]": {
            color: theme.palette.text.secondary
        }
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

}));

const PrimusSectionLayout = ({id, sortableHandle, collapsible, expanded, onExpand, onDelete, onCollapse, currentId, padding = 2, spacing = 2, title = "Section", children}) => {
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
                {sortableHandle}
                <Typography className={classes.title}>{title}</Typography>
            </header>
 
        </section>
    )

}

export default PrimusSectionLayout