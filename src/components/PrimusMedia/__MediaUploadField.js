import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from 'react-redux';
import { setParentId } from '../../redux/modelsById';
import { getQuery } from '../../redux/searchByUrl';
import { getUpload } from '../../redux/uploadByUrl';
import Dropzone from 'react-dropzone'
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import CloudDoneIcon from '@material-ui/icons/CloudDone';
import Typography from '@material-ui/core/Typography';
import qs from 'query-string';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    grid: {
    },
    list: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    item: {
        flexBasis: 0,
        flexGrow: 1,
        minWidth: 160,
        maxWidth: 160,
        padding: theme.spacing(.5)
    },
    media: {
        display: "block",
        position: "relative",
        backgroundColor: "white",
        width: "100%",
        paddingBottom: "100%"
    },
    image: {
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        display: "block",
        maxWidth: "100%",
        maxHeight: "100%",
        margin: "auto"
    },
    placeholder: {
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    }
}));

const PrimusUploadField = (props) => {
    const { pathname } = props.formContext
    const { LayoutField } = props.registry.fields

    const dispatch = useDispatch()
    const editor = useSelector(state => state.editor)

    const { id, collectionId } = editor.formData

    const query = {
        url: pathname + "/media",
        models: "media",
        collectionId: collectionId,
        parentId: id,
    }

    useEffect(() => {
        query.parentId && dispatch(getQuery(query))
    }, [query.parentId, editor.isSaving])

    const searchByUrl = useSelector(state => state.searchByUrl)
    const currentSearch = searchByUrl && searchByUrl[query.url] || {}

    let formData = props.formData || []

    let uniqueIds = []

    formData && formData.map(model => {
        uniqueIds.push(model.mediaId)
    })

    useEffect(() => {

        currentSearch.resultsLoaded && currentSearch.resultsLoaded.map(model => {

            const { uniqueId } = model

            if (!uniqueIds.includes(uniqueId)) {
                formData.push({
                    mediaId: model.uniqueId,
                    media: model,
                })
            }

        })

        props.onChange(formData)

    }, [currentSearch.resultsLoaded])

    const upload = {
        url: pathname + "/upload",
        multiple: true,
        accept: "image/*, video/*, audio/*",
    }

    const uploadByUrl = useSelector(state => state.uploadByUrl)
    const currentUpload = uploadByUrl && uploadByUrl[upload.url] || {}

    const _onAdd = ({uniqueId}) => {
        dispatch(setParentId({
            modelName: "media",
            uniqueId: uniqueId,
            parentId: id
        }))   
    }

    const _onRemove = ({uniqueId}) => {
        dispatch(setParentId({
            modelName: "media",
            uniqueId: uniqueId,
            parentId: null
        }))   
    }


    useEffect(() => {

        currentUpload.resultsLoaded && currentUpload.resultsLoaded.map(model => {

            const { uniqueId } = model

            if (!uniqueIds.includes(uniqueId)) {
                formData.push({
                    mediaId: model.uniqueId,
                    media: model,
                })
            }

        })

        props.onChange(formData)

    }, [currentUpload.resultsLoaded])


    const _onUpload = (acceptedFiles = []) => {

        const uploadData = {
            parentId: id,
            collectionId: collectionId,
            status: "upload"
        }

        dispatch(getUpload({
            url: upload.url,
            acceptedFiles,
            uploadData
        }))
        
    }


    const classes = useStyles()

    const modelsById = useSelector(state => state.modelsById)


    const MediaItem = ({mediaId, media}) => {

        const uniqueModel = modelsById && modelsById[media.uniqueId]

        const model = {
            ...media,
            ...uniqueModel
        }

        let imageUrl = model.imageUrl
        let sq = qs.parseUrl(imageUrl)

        const { uploadProgress } = model

        if (uploadProgress && uploadProgress < 100) {

            imageUrl = qs.stringifyUrl({
                ...sq,
                query: {
                    ...sq.query,
                    "uploadProgress": uploadProgress
                }
            })
        }

        const _onClick = (event) => {
            event.stopPropagation()

        }

        return (
            <figure className={classes.item} onClick={_onClick}>
                <div className={classes.media}>
                    <img className={classes.image} src={imageUrl} />
                </div>
            </figure>
        )
    
    }

                /*
                {currentSearch && currentSearch.resultsLoaded && currentSearch.resultsLoaded.map((model, index) => {
                    return false || <PrimusMediaItem media={model} key={index} />
                })}

                {currentUpload && currentUpload.resultsLoaded && currentUpload.resultsLoaded.map((media, index) => {
                    return false ||  <PrimusMediaItem media={media} key={index} />
                })}

                */

    const MediaPlaceholder = () => {

        return (
            <figure className={classes.item}>
                <div className={classes.media}>
                    <div className={classes.placeholder}>
                        <CloudUploadIcon className={classes.icon} />
                        <Typography className={classes.label}>Upload</Typography>
                    </div>
                </div>
            </figure>
        )
        
    }

    const MediaList = () => {

        return (
            <div className={classes.list}>

                {formData && formData.map((model, index) => {
                    return <MediaItem {...model} key={index} />
                })}

                <MediaPlaceholder />

        </div>
        )

    }

    const MediaUpload = () => {

    }
    
    return (
        <LayoutField {...props}>

            <Dropzone multiple={upload.multiple} accept={upload.accept} onDrop={_onUpload}>
                {({getRootProps, getInputProps}) => (

                    <div className={classes.grid} {...getRootProps()}>
                        <input {...getInputProps()} />

                        <MediaList />

                    </div>

                )}
                </Dropzone>

        </LayoutField>

    )

}

PrimusUploadField.defaultProps = {
}

export default PrimusUploadField