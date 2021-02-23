import React from "react"
import ModuleImage from "./ModuleImage"
import ModuleIcon from "./ModuleIcon"

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    media: {
        display: "block",
        position: "relative",
        width: props => { return props.width },
        height: props => { return props.height },
        margin: 0,
    },
}));

const ModuleMedia = ({imageUrl, icon, icons, documentType, mediaType}) => {

    const classes = useStyles()

    return (
        <div className={classes.media}>
            { !imageUrl && <ModuleIcon icons={icons} icon={icon} documentType={documentType} mediaType={mediaType} /> }
            { imageUrl && <ModuleImage imageUrl={imageUrl} /> }
        </div>
    )

}


export default ModuleImage