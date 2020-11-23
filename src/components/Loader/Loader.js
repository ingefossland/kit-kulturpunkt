import React from 'react';
import PropTypes from "prop-types"
import { makeStyles } from '@material-ui/core/styles';
import { AppIcon } from "@kit-ui/icons"

const useStyles = makeStyles(theme => ({
    loader: {
        position: "fixed",
        zIndex: 2000,
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: "white",
        color: "black",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity: 0,
        transition: ".5s ease-out",
        pointerEvents: "none",
        "[data-is-loading=true] &": {
            opacity: 1
        }
    },
    icon: {
        "& > svg": {
            fontSize: "64px"
        },
        "& > img": {
            width: theme.spacing(8),
            height: theme.spacing(8)
        },

        transition: ".5s ease-out",
        transform: "scale(3)",
        opacity: 0,

        "[data-is-loading=true] &": {
            opacity: 1,
            transform: "scale(1)"
        }

    },
    content: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        "& * + *": {
            margin: theme.spacing(.5)
        },
    },
    title: {
        fontFamily: "Akkurat, sans-serif",
        fontWeight: "bold",
        fontSize: "16px",
        color: theme.palette.text.primary
    },
    description: {
        fontFamily: "Akkurat, sans-serif",
        fontSize: "14px",
        color: theme.palette.text.secondary
    }
}));

const Loader = ({className, isLoading = true, icon, imageUrl, title, description, children}) => {
    const classes = useStyles()

    return (
        <div data-is-loading={isLoading}>
            <div className={classes.loader}>
                <div className={classes.icon}>
                    { icon || imageUrl && <img src={imageUrl} /> || <AppIcon />}
                </div>
                <div className={classes.content}>
                    <h2 className={classes.title}>{title}</h2>
                    <p className={classes.description}>{description}</p>
                </div>
            </div>
            {!isLoading && children}
        </div>
    )

}

Loader.defaultProps = {
    title: "App",
    description: "Loading app"
}

Loader.propTypes = {
    /** Wheter app is loading or not, if not */
    isLoading: PropTypes.bool,
    /** SVG icon */
    icon: PropTypes.node,
    /** ImageUrl, displayed if no icon is present */
    imageUrl: PropTypes.string,
    /** Loading title, normally the title of the app that is loading */
    title: PropTypes.string,
    /** Description. Consider changing this on load progress */
    description: PropTypes.string,
}


export default Loader
