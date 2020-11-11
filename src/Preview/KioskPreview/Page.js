import React from "react"
import { makeStyles } from '@material-ui/core/styles';
import { withResizeDetector } from 'react-resize-detector';

import PreviewFormat from "./PreviewFormat"

import Menu from "./Menu"
import Grid from "./Grid"
import Timeline from "./Timeline"
import Imagemap from "./AnnotateImagemap"
import Legends from "./AnnotateLegends"

const templates = {
    "device": Menu,
    "pageAnnotate/imagemap": Imagemap,
    "pageAnnotate/legends": Legends,
    "pageTimeline": Timeline,
    "pageList": Grid,
    "pageGrid": Grid,
    "pageMedia": Grid,
    "pageMedia/gallery": Grid,
    "pageMedia/autoplay": Grid,
    "page": Grid
}


const useStyles = makeStyles(theme => ({
    root: {
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundImage: props => { return 'url('+props.backgroundImageUrl+')' },
        backgroundPosition: "50% 50%",
        backgroundSize: "cover",
        fontSize: props => { return props.fontSize },
    },
    page: {
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        flexDirection: "column",
        width: "100%",
        height: "100%",
    },
    header: {
        width: "100%",
        display: "flex",
        margin: theme.spacing(2)
    },
    title: {
        fontSize: "3em"
    },
    body: {
        flexBasis: "100%",
        flexGrow: 1,
        width: "100%",
        position: "relative"
    },
    footer: {
        flexBasis: "15%",
        width: "100%",
        margin: theme.spacing(2)
    },
}));



const PreviewPage = ({width, height, ...props}) => {

    const fontSize = width / 64 + "px";

    const classes = useStyles({
        fontSize: fontSize,
    })
    
    const formData = props.formData;

    const { documentType, content } = formData;

    let layout;

    if (documentType === "pageAnnotate") {
        layout = content && content.annotateLayout
    }

    if (documentType === "pageMedia") {
        layout = content && content.mediaLayout
    }

    let template;

    if (layout) {
        template = documentType + "/" + layout
    } else {
        template = documentType
    }

    let PreviewTemplate = templates && templates[template]

    if (!PreviewTemplate) {
        return (<p>No preview for {template}</p>)
    }


    return (
        <PreviewFormat format="16:9">
            <div className={classes.root}>
                <PreviewTemplate {...props} />
            </div>
        </PreviewFormat>
    )

}

PreviewPage.defaultProps = {
    formData: {},
    formContext: {}
}

export default withResizeDetector(PreviewPage)