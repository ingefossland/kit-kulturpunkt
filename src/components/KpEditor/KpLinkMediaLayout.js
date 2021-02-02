import React, { Component } from 'react';
import { ImagePreview } from "@kit-ui/admin"
import { makeStyles } from '@material-ui/core/styles';
import KpLinkButtons from './KpLinkButtons';


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
    buttons: {
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
    preview: {
        margin: 0
    }
}));

const KpLinkMediaLayout = (props) => {

    const { mediaId, media, referenceId, reference, onChange, onDialog } = props;

    const classes = useStyles()

    const mediaButtons = [
        {
            icon: "remove_circle",
            title: "Remove",
            variant: "text",
            size: "small",
            onClick: () => onChange({mediaId: undefined, media: {}})
        }
    ]

    const buttons = [
        {
            icon: "search",
            title: "Finn media",
            color: "inherit",
            size: "small",
            onClick: () => onDialog(props)
        }
    ]

    const imageUrl = mediaId && media && media.imageUrl || referenceId && reference && reference.imageUrl;

    if (media && media.imageUrl) {
        return (
            <div className={classes.root} data-name="media">
                <ImagePreview className={classes.preview} imageUrl={media.imageUrl} />
                <KpLinkButtons className={classes.buttons} buttons={mediaButtons} />
            </div>
        )
    }

    if (referenceId && reference && reference.imageUrl) {
        return (
            <div className={classes.root} data-name="media">
                <ImagePreview className={classes.preview} imageUrl={reference.imageUrl} />
                <KpLinkButtons className={classes.buttons} buttons={buttons} />
            </div>
        )
    }

    return (
        <div className={classes.root} data-name="media">
            <KpLinkButtons className={classes.buttons} buttons={buttons} />
        </div>
    )

}

export default KpLinkMediaLayout