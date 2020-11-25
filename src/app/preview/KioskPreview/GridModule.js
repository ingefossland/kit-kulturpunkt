import React, { useState, useEffect } from "react"
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { ImageBase } from "@kit-ui/admin"

const useStyles = makeStyles(theme => ({
    module: {
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: props => { return props.backgroundColor },
        color: props => { return props.color},
    },
    media: {
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
    },
    content: {
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        display: "flex",
        flexDirection: "column",
        padding: "0.5em 1em",
        justifyContent: props => { return props.justifyContent},
        alignItems: props => { return props.alignItems}
    },
    runningHead: {
        fontSize: props => { return props.titleSize === "large" && "1.25em" || props.titleSize === "medium" && "1em" || "0.875em" },
        color: props => { return props.titleColor || props.color },
        textTransform: "uppercase",
        lineHeight: 1.5
    },
    title: {
        fontSize: props => { return props.titleSize === "large" && "2em" || props.titleSize === "medium" && "1.5em" || "1.25em" },
        color: props => { return props.titleColor || props.color },
        lineHeight: 1.2,
        "& + $description": {
            marginTop: theme.spacing(1)
        }
    },
    description: {
        fontSize: "1em",
        opacity: 0.8
    }
}));

const getTextPlacement = ({placement = "top-left"}) => {

    let justifyContent = "center"
    let alignItems = "center"

    // horizontal

    if (placement.includes('left')) {
        alignItems = "flex-start"
    } else if (placement.includes('right')) {
        alignItems = "flex-end"
    }

    // vertical

    if (placement.includes('top')) {
        justifyContent = "flex-start"
    } else if (placement.includes('bottom')) {
        justifyContent = "flex-end"
    }
    
    return {
        justifyContent: justifyContent,
        alignItems: alignItems
    }

}

const GridModule = ({imageUrl, mediaWidth, mediaHeight, imageCropdata, imageFilters, runningHead, title, description, skin, width, height, onClick, ...props}) => {
    const { justifyContent, alignItems } = getTextPlacement(props)

    const classes = useStyles({...props, justifyContent, alignItems})

    return (
        <Card className={classes.module} onClick={onClick}>
            { imageUrl && <ImageBase imageUrl={imageUrl} imageFilters={imageFilters} imageCropdata={imageCropdata} objectFit="cover" /> }

            <CardContent className={classes.content}>
                { runningHead && <Typography className={classes.runningHead} component="h3">{runningHead}</Typography> }
                <Typography className={classes.title} component="h2">{title}</Typography>
                { description && <Typography className={classes.description} component="p">{description}</Typography> }
            </CardContent>

        </Card>
    )

}

export default GridModule