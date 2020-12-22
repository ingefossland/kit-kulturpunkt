import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from 'react-redux';
import { getUpload } from '../redux/uploadByUrl';
import qs from 'query-string';

import Bulk from "./Bulk"
import FinderLayout from "./FinderLayout"
import View from "./View"
import UploadDropzone from "../Upload/UploadDropzone"

const MediaUpload = (props) => {
    const dispatch = useDispatch()

    const app = useSelector(state => state.app)
    const finder = useSelector(state => state.finder)

    // set query

    const pathname = props.location.pathname
    const sq = props.location.search && qs.parse(props.location.search)

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

    const uploadByUrl = useSelector(state => state.uploadByUrl)
    const currentUpload = uploadByUrl && uploadByUrl[pathname] || {}

    return (
        <Bulk>
            <FinderLayout {...finder} {...props}>
                <View {...currentUpload} {...props} />
                <UploadDropzone onUpload={_onUpload} />
            </FinderLayout>
        </Bulk>
    )

}

MediaUpload.defaultProps = {
}

export default MediaUpload