import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from 'react-redux';
import { getApp, getAppLayout, getParents } from '../redux/app';
import { getUpload } from '../redux/uploadById';

import FinderView from "./FinderView"
import UploadDropzone from "../Upload/UploadDropzone"

const MediaUpload = (props) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAppLayout("finder"))
    }, [])

    const app = useSelector(state => state.app)
    const menuByUrl = app && app.menuByUrl

    const { pathname } = props.location

    useEffect(() => {
        menuByUrl && dispatch(getParents({menuByUrl, pathname: pathname}))
    }, [menuByUrl, pathname])


    const _onUpload = (acceptedFiles = []) => {

        const uploadData = {
            collectionId: app.collectionId,
            status: "upload"
        }

        dispatch(getUpload({
            id: pathname,
            acceptedFiles,
            uploadData
        }))

    }


    const uploadById = useSelector(state => state.uploadById)

    const currentUpload = uploadById && uploadById[pathname] || {}


    return (
        <>
            <FinderView {...currentUpload} {...props} />
            <UploadDropzone onUpload={_onUpload} />
        </>
    )

}

MediaUpload.defaultProps = {
}

export default MediaUpload