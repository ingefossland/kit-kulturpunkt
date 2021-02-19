import React, { Component } from 'react';
import { ImagePreview } from "@kit-ui/admin"
import { makeStyles } from '@material-ui/core/styles';

import ButtonBase from '@material-ui/core/ButtonBase';
import Icon from '@material-ui/core/Icon';

const useStyles = makeStyles(theme => ({
    root: {
        display: "block",
        position: "relative",
        backgroundColor: "#333",
        color: "white",

        minHeight: 256,

        "&:hover $preview": {
            opacity: .5,
        }

    },
    buttongroup: {
        zIndex: 2,
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    button: {
        fontFamily: "Akkurat, sans-serif",
        fontSize: "14px",
        fontWeight: "bold",
        textTransform: "none",
        letterSpacing: 0,
        borderRadius: 1,
        minWidth: theme.spacing(12),
        minHeight: theme.spacing(7),
    },
    icon: {
        marginRight: theme.spacing(1),
        "& + $label": {
            marginRight: theme.spacing(1)
        }
    },
    preview: {
        margin: 0
    }
}));



const KpLinkMediaLayout = (props) => {

    const { mediaId, media, referenceId, reference, onChange, onDialog } = props;

    const classes = useStyles()

    const Button = ({icon, title, color="primary", variant="outlined", size="large", ...props}) => {
        
        return (
            <ButtonBase className={classes.button}>
                { icon && <Icon className={classes.icon}>{icon}</Icon>}
                <b className={classes.label}>{title}</b>
            </ButtonBase>
        )
    
    }

    const Buttongroup = ({buttons = []}) => {

        const classes = useStyles({spacing: 1})
    
        if (!buttons.length) {
            return null
        }
    
        return (
            <div className={classes.buttongroup}>
                { buttons && buttons.map((button, index) => {
                    return (
                        <Button {...button} key={index} />
                    )
                })}
            </div>
        )
        
    }

    const removeMedia = {
        icon: "remove_circle",
        title: "Fjern bilde",
        onClick: () => onChange({mediaId: undefined, media: {}})
    }

    const findMedia = {
        icon: "search",
        title: "Finn bilde",
        onClick: () => onDialog(props)
    }

    const replaceMedia = {
        icon: "search",
        title: "Endre bilde",
        onClick: () => onDialog(props)
    }


    if (media && media.imageUrl) {
        return (
            <div className={classes.root} data-name="media">
                <ImagePreview className={classes.preview} imageUrl={media.imageUrl} />
                <Buttongroup className={classes.buttons} buttons={[removeMedia]} />
            </div>
        )
    }

    if (referenceId && reference && reference.imageUrl) {
        return (
            <div className={classes.root} data-name="media">
                <ImagePreview className={classes.preview} imageUrl={reference.imageUrl} />
                <Buttongroup className={classes.buttons} buttons={[replaceMedia]} />
            </div>
        )
    }

    return (
        <div className={classes.root} data-name="media">
            <Buttongroup className={classes.buttons} buttons={[findMedia]} />
        </div>
    )

}

export default KpLinkMediaLayout