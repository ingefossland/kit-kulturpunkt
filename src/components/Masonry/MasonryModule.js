import React from 'react';
import { ModuleBase, ModuleTitle, ModuleLabel, ModuleMetadata } from "@kit-ui/admin"
import { ButtonSelect } from "../"

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    module: {
        position: "relative",
        width: "100%",
        boxShadow: theme.shadows[1],

        "&:hover": {
            boxShadow: theme.shadows[4]
        },

        "&[aria-selected=true]": {
            backgroundColor: theme.palette.action.selected,
        }

    },
    primaryAction: {
        position: "absolute",
        top: 0,
        left: 0,
    },
    figure: {
        width: "100%",
        overflow: "hidden",
        margin: 0,

        "& > img": {
            display: "block",
            width: "100%"
        }

    },
    content: {
        padding: theme.spacing(1)
    }

}));


const MasonryModule = ({uniqueId, title, imageUrl, documentType, selectable, selected, onSelect, onEdit, ...props}) => {

    const classes = useStyles()

    const _onSelect = (event) => {
        event.stopPropagation()
        onSelect && onSelect()
    }

    return (
        <ModuleBase className={classes.module} selected={selected} elevation={1} onClick={onEdit}>
            
            <figure className={classes.figure}>
                <img src={imageUrl} />
            </figure>
            <div className={classes.content}>
                <ModuleTitle title={title} />
                <ModuleLabel>{documentType}</ModuleLabel>
                <ModuleMetadata metadata={[uniqueId]}></ModuleMetadata>
            </div>
            <div className={classes.primaryAction}>
                { selectable && <ButtonSelect selected={selected} onClick={_onSelect} /> }
            </div>
        </ModuleBase>
    )

}

export default MasonryModule