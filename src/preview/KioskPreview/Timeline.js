import React from "react"
import { makeStyles } from '@material-ui/core/styles';
import { getPreviewItem } from "./utils"

import PageHeader from "./PageHeader"
import TimelineModule from "./TimelineModule"

const useStyles = makeStyles(theme => ({
    root: {
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        display: "flex",
        flexDirection: "column",
    },
    body: {
        overflowX: "scroll",
    },
    timeline: {
        display: "flex",
        margin: "0 3.5em",
    },
    timelineItem: {
        position: "relative",
        margin: ".5em"
    }
}));

const Timeline = ({localeId, items, onCurrentId}) => {

    const classes = useStyles()

    const TimelineItem = ({id, cols, rows, index, ...item}) => {
        return (
            <div className={classes.timelineItem}>
                <TimelineModule {...item} onClick={() => onCurrentId(id)} />
            </div>
        )
    }
    
    return (
        <div className={classes.timeline}>
            { items && items.map((item, index) => {
                const itemProps = getPreviewItem({...item, localeId: localeId, index: index})
                return (
                    <TimelineItem {...itemProps} key={index} />
                )
            })}
        </div>
    )

}

const PreviewTimeline = ({formData, formContext, width, height}) => {
    const { title, links, backgroundImage } = formData.content;
    const locale = formContext && formContext.currentLocale || formContext && formContext.defaultLocale;
    const localeId = "locale:"+locale
    const pageTitle = title && title[localeId] || formData.title

    const onCurrentId = formContext.onCurrentId

    const classes = useStyles()

    return (
        <div className={classes.root}>
            <PageHeader title={pageTitle}  />
            <div className={classes.body}>
                <Timeline localeId={localeId} items={links} width={width} height={height} onCurrentId={onCurrentId} />
            </div>
        </div>
    )

}

export default PreviewTimeline