import React from "react"
import { makeStyles } from '@material-ui/core/styles';

import LayoutList from "./LayoutList"
import LayoutGrid from "./LayoutGrid"
import LayoutSlideshow from "./LayoutSlideshow"


import ModuleMedia from "./ModuleMedia"

const layouts = {
    "list": LayoutList,
    "grid": LayoutGrid,
    "slideshow": LayoutSlideshow
}

const useStyles = makeStyles(theme => ({
    media: {
        position: "relative"
    },
}));

const ArticleMedia = ({className, language = "no", layout = "grid", media = [], mediaWidth = 180, mediaHeight = 180}) => {
    const localeId = "locale:" + language;
    const classes = useStyles({mediaWidth, mediaHeight})

    const renderMedia = ({media, mediaSize, mediaFormat, content}) => {
        const mediaType = media && media.mediaType;

        let headline = content && content.headline || media && media.content && media.content.headline || undefined
        let caption = content && content.caption || media && media.content && media.content.caption || undefined

        const byline = content && content.byline || media && media.content && media.content.byline || undefined
        const license = content && content.license || media && media.content && media.content.license || undefined

        if (typeof headline === "object") {
            headline = headline[localeId] || undefined
        }

        if (typeof caption === "object") {
            caption = caption[localeId] || undefined
        }
       
        return (
            <ModuleMedia {...media}
                size={mediaSize} 
                mediaFormat={mediaFormat} 
                headline={headline} 
                caption={caption}
                byline={byline}
                license={license} />
        )
    
    }
        
    if (!media.length) {
        return false
    }

    const LayoutTemplate = layout && layouts[layout]

    if (LayoutTemplate) {
        return (
            <LayoutTemplate>
                { media.map(media => renderMedia(media))}
            </LayoutTemplate>
        )
    }

    return (
        <div className={className}>
            { media.map(media => renderMedia(media))}
        </div>
    )

}

export default ArticleMedia