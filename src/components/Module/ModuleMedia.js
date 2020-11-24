import React from 'react';
import PropTypes from "prop-types"
import Paper from '@material-ui/core/Paper';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        display: "block",
        position: "relative",
        width: props => { return props.width },
        height: props => { return props.height },
        margin: "0",
    },
    cropbox: {
        display: "block",
        position: "absolute",
        backgroundColor: props => { return props.backgroundColor },
//        backgroundColor: "grey",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        maxWidth: "100%",
        maxHeight: "100%",
        margin: "auto",
        overflow: "hidden",
        opacity: "1",
        transformOrigin: "50% 50%",
        transition: "transform .135s cubic-bezier(0.0,0.0,0.2,1)",
        transform: "scale(1)",
        userSelect: "none",
        "&[aria-selected=true]": {
            transform: "scale(0.8)",
        }
    },
    image: {
        display: "block",
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: "50%",
        transform: "translateX(-50%)",        
        maxWidth: props => { return props.maxWidth },
        maxHeight: props => { return props.maxHeight },
        margin: "auto"
    },
}));

const ModuleMedia = ({className, elevation = 0, selected = false, imageUrl, backgroundColor = "grey", layout = "contain", width = "56px", height = "56px", maxWidth = "100%", maxHeight = "100%", margin = 0, onClick, ...props}) => {
    const classes = useStyles({...props, backgroundColor, width, height, maxWidth, maxHeight, margin})

    const coverStyle = {
        backgroundPosition: "50% 50%",
        backgroundImage: "url("+imageUrl+")",
        backgroundSize: layout,
        backgroundRepeat: "no-repeat" 
    }

    if (selected) {
//        elevation = elevation * 4
    }

    if (layout === "cover") {
        return (
            <div className={className || classes.root} aria-selected={selected} onClick={onClick}>
                <Paper component="figure" className={classes.cropbox} aria-selected={selected} style={coverStyle} square={true} elevation={elevation}>
                    <img src={imageUrl} className={classes.image} style={{display: "none"}} />
                </Paper>
            </div>
        )
    }

    return (
        <div className={className || classes.root} aria-selected={selected} onClick={onClick}>
            <Paper component="figure" className={classes.cropbox} aria-selected={selected} square={true} elevation={elevation}>
                <img src={imageUrl} className={classes.image} />
            </Paper>
        </div>
    )
}

ModuleMedia.propTypes = {
    imageUrl: PropTypes.string,
    width: PropTypes.string,
    height: PropTypes.string,
    margin: PropTypes.string
};

export default ModuleMedia;