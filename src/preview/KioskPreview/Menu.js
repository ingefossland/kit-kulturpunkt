import React from "react"
import { makeStyles } from '@material-ui/core/styles';
import { getPreviewItem } from "./utils"

import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    root: {
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    menuList: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "0 3.5em",
    },
    menuItem: {
        position: "relative",
        width: '8em',
        margin: ".5em"
    },
    figure: {
        paddingBottom: "100%",
        borderRadius: "100%",
        backgroundColor: "white"
    },
    title: {
        color: "white", 
        textAlign: "center",
        lineHeight: 1.25,
        height: "2.5em",
        margin: theme.spacing(1)
    }
}));

const MenuItem = ({title}) => {

    const classes = useStyles()

    return (
        <article className={classes.menuItem}>
            <figure className={classes.figure}>

            </figure>
            <Typography className={classes.title}>{title}</Typography>
        </article>
    )


}

const Menu = ({items, onCurrentId}) => {

    const classes = useStyles()


    const TimelineItem = ({cols, rows, index, ...item}) => {
        const id = "root_content_pageLinks_" + index
        return (
            <MenuItem {...item} onClick={() => onCurrentId(id)} />
        )
    }
    
    return (
        <div className={classes.menuList}>
            { items && items.map((item, index) => {
                const itemProps = getPreviewItem({...item, index: index})
                return (
                    <TimelineItem {...itemProps} key={index} />
                )
            })}
        </div>
    )

}

const PreviewTimeline = ({formData, formContext, width, height}) => {

    return (
        <p>{JSON.stringify(formData)}</p>
    )


    const { pageTitle, backgroundImage, hasPages } = formData.content;
    const currentLocale = formContext && formContext[currentLocale];
    const title = pageTitle && pageTitle[currentLocale] || formData.title

    const onCurrentId = formContext.onCurrentId

    const classes = useStyles()

    return (
        <div className={classes.root}>
            <Menu items={hasPages} width={width} height={height} onCurrentId={onCurrentId} />
        </div>
    )

}

export default PreviewTimeline