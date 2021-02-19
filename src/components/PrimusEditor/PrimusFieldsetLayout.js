import React, { useRef, useEffect } from "react"
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    section: {
        padding: 0,
        margin: 0,
    },
    header: {
        display: "flex",
        alignItems: "center",
        minHeight: theme.spacing(7),
        paddingLeft: props => { return theme.spacing(props.padding) },
        paddingRight: props => { return theme.spacing(props.padding) },
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
        paddingLeft: props => { return theme.spacing(props.padding) },
        paddingRight: props => { return theme.spacing(props.padding) },

        "& > * + *": {
            marginTop: props => { return theme.spacing(props.spacing) },
        }

    },

}));

const PrimusSectionLayout = ({id, currentId, padding = 2, spacing = 2, title = "Section", children}) => {
    const classes = useStyles({padding, spacing})
    const ref = useRef(null)

    useEffect(() => {
        if (currentId === id) {
            ref.current.scrollIntoView({behavior: 'smooth'}) 
        }
    }, [currentId])

    return (
        <section ref={ref} id={id} className={classes.section}>

            <header className={classes.header}>
                <Typography className={classes.title}>{title}</Typography>
            </header>

            <div className={classes.body}>
                {children}
            </div>
 
        </section>
    )

}

export default PrimusSectionLayout