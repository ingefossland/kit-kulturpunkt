import React, { useState } from 'react';
import MediaEditorToolbar from "./MediaEditorToolbar"

import ImagePreview from "./ImagePreview"
import ImageAnnotations from "./ImageAnnotations"

import MediaArrayItems from "./MediaArrayItems"

import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
    media: {
        backgroundColor: "#333",
        position: "absolute",
        zIndex: 2,
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        width: "100%",
        overflow: "hidden",
    },
    split: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "row",
    },
    view: {
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%"
    },
    edit: {
        display: "none",
        
        "&[aria-expanded=true]": {
            display: "block"
        },
    

        position: "relative",
        backgroundColor: "#444",
        flexBasis: 320,
    },

    preview: {
        width: "100%",
        flexBasis: "75%",
        flexGrow: 1,

        display: "flex",
        justifyContent: "center",
        alignItems: "center",

    },
}));

const MediaArrayLayout = ({formContext = {}, items = [], currentIndex, toolbar, expanded = true, action, onAddItem, onUpload, onSelect, onSelectIndex, children, ...props}) => {
    const classes = useStyles();

    const currentItem = items && items[currentIndex]

    const imageUrl = currentItem && currentItem.media && currentItem.media.imageUrl

    const [imageAnnotations, setImageAnnotations] = useState([])

    expanded = action && action !== "view"

    const _onAnnotate = (formData) => {
        setImageAnnotations(formData)
    }

    const MediaView = () => {

        if (action === "annotate") {
            return (
                <div className={classes.view}>
                    <MediaEditorToolbar toolbar={toolbar} action={action} classes={classes.toolbar} />
                    <ImageAnnotations imageUrl={imageUrl} imageAnnotations={imageAnnotations} onChange={_onAnnotate} className={classes.preview} />
                    <MediaArrayItems currentItem={currentItem} items={items} onUpload={onUpload} onSelect={onSelect} onSelectIndex={onSelectIndex} />
                </div>
            )
        }

        return (
            <div className={classes.view}>
                <MediaEditorToolbar toolbar={toolbar} action={action} classes={classes.toolbar} />
                <ImagePreview imageUrl={imageUrl} className={classes.preview} />
                <MediaArrayItems currentItem={currentItem} items={items} onUpload={onUpload} onSelect={onSelect} onSelectIndex={onSelectIndex} />
            </div>
        )
        
    }

    return (
        <div className={classes.media}>
            <div className={classes.split}>
                <MediaView />
                <div className={classes.edit} aria-expanded={expanded}>
                    {children}
                </div>
            </div>
        </div>
    )

}

export default MediaArrayLayout;