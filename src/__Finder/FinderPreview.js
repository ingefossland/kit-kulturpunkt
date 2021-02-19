import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getModel, deleteModel, restoreModel, eraseModel, selectModel } from '../redux/modelsById';

import ButtonBase from "@material-ui/core/ButtonBase"
import IconButton from "@material-ui/core/IconButton"
import SelectIcon from "@material-ui/icons/ChevronRight"

import Typography from "@material-ui/core/Typography"

import { ModuleLabel } from "@kit-ui/admin"
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    module: {
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,

        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        margin: theme.spacing(1),

        
    },

    header: {
        margin: theme.spacing(2),
        flexBasis: 0,
        flexGrow: 1,
        color: "inherit",
        textAlign: "center",

    },
    title: {
        fontFamily: "Akkurat, sans-serif",
        fontWeight: "bold",
        fontSize: 24
    },

    footer: {
        display: "flex",
        overflow: "hidden",
        "& > * + *": {
            marginLeft: theme.spacing(1)
        }
    },
    select: {
        }


}));


const FinderPreview = ({model, ...props}) => {

    const dispatch = useDispatch()

    const { modelName, uniqueId } = model

    useEffect(() => {
        if (modelName && uniqueId && !modelsById[uniqueId]) {
            dispatch(getModel({modelName: modelName, uniqueId: uniqueId}))
        }
    }, [uniqueId])

    const classes = useStyles()

    const modelsById = useSelector(state => state.modelsById)
    const uniqueModel = modelsById && modelsById[uniqueId] || {}

    model = {
        ...model,
        ...uniqueModel,
    }

    const { title, description, documentType, content } = model

    return (
        <div className={classes.module}>
            <header className={classes.header}>
                <Typography className={classes.title} component="h2">{title}</Typography>
                <Typography className={classes.description} component="h3">{description}</Typography>
                <ModuleLabel>{documentType}</ModuleLabel>
           </header>
            <div className={classes.content}>
                {JSON.stringify(content)}
            </div>
            <footer className={classes.footer}>
                footer
            </footer>
        </div>

    )

    
}

export default FinderPreview