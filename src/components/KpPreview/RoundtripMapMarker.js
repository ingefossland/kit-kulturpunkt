import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import PlaceIcon from '@material-ui/icons/Place';

const useStyles = makeStyles(theme => ({
    link: {
        position: "absolute",
        left: -theme.spacing(1.5),
        top: -theme.spacing(3),

        "& $media": {
            transition: ".125s ease-out",
            transform: "scale(1)"
        },

        "&[aria-expanded=true] $media": {
            transform: "scale(2)"
        },

        "&:hover $media": {
            transform: "scale(2)"
        }

    },
    label: {
        position: "absolute",
        width: theme.spacing(2),
        height: theme.spacing(2),
        margin: theme.spacing(0, .5),
        borderRadius: "100%",
        backgroundColor: "red",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    media: {
        position: "absolute",
        width: theme.spacing(3),
        height: theme.spacing(3),
        margin: theme.spacing(-.5, 0),
        borderRadius: "100%",
        backgroundColor: "red",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundSize: "cover",

    },
    image: {

    }
}));

const MapLink = ({reference, media, index}) => {
    const classes = useStyles()

    const imageUrl = media && media.imageUrl || reference && reference.imageUrl

    return (
        <div className={classes.link} aria-expanded={index === 0}>
            <figure className={classes.media} style={{backgroundImage: "url("+imageUrl+")"}}></figure>
            <i className={classes.label}>{index+1}</i>
            <PlaceIcon />
        </div>
    )

}


export default MapLink;