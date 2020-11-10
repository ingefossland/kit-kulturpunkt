import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { getQuery } from '../redux/searchById';

import DialogBase from "./DialogBase"
import DialogSearch from "./DialogSearch"
import DialogUpload from "./DialogUpload"

import DialogHeader from "./DialogHeader"
import DialogSection from "./DialogSection"

import SearchResults from "./SearchResults"

import qs from 'query-string';

const UploadDialog = ({schema, formData, onChange, onClose, query, upload, ...props}) => {
    const { t, i18n } = useTranslation(['dialog']);
    const dispatch = useDispatch()

    const searchById = useSelector(state => state.searchById)
    const uploadById = {}

    const [q, setQ] = useState("")

    const handleQuery = (q) => {
        setQ(q)
    }

    const handleReset = () => {
        if (q) {
            setQ("")
        } else if (onClose) {
            onClose()
        }
    }

    const search = {
        placeholder: t("Search uploads"),
    }

    // handle upload

    const [uploadSession, setUploadSession] = useState(false)

    const handleUpload = (acceptedFiles = []) => {

        const uploadData = {
            collectionId: query.collectionId,
            status: "upload"
        }

        props.getUpload({id: upload.id, session: uploadSession, acceptedFiles, uploadData})

        setUploadSession(true)

    }
    
    // current uploads 

    const currentUpload = upload.id && uploadById && uploadById[upload.id];
    const uploadModels = currentUpload && currentUpload.models 

    const uploadResults = uploadModels && q && uploadModels.filter((model) => { 
        const { title } = model

        if (title.includes(q)) {
            return true
        }

        return false
    }) || uploadModels


    let placeholder = t("Search uploads")

    const tabs = uploadResults && [
        {
            title: t("media"),
            count: uploadResults.length             
        }
    ]

    return (
        <DialogBase>
           <DialogSection>
                <DialogSearch {...search} 
                    placeholder={placeholder}
                    expanded={uploadResults && true}
                    onChange={handleQuery}
                    onReset={handleReset}
                    
                />
                <DialogHeader tabs={tabs}></DialogHeader>
                <SearchResults 
                    schema={schema}
                    formData={formData}
                    onChange={onChange}
                    query={query}
                    layout="uploads"
                    results={{
                        ...currentUpload,
                        uploads: uploadResults || [],
//                        resultsLoaded: currentUpload && currentUpload.models,
//                        pages: pages,
//                        page: currentPage,
//                        nextPage: nextPage
                    }}
                />
                <DialogUpload 
                    {...upload} 
                    currentUpload={currentUpload} expanded={!currentUpload} onUpload={handleUpload} onCancel={handleReset}></DialogUpload>
            </DialogSection>
       </DialogBase>        
    )

}

UploadDialog.defaultProps = {
    upload: {
        id: "/dialog/upload",
        accept: [
            "image/*",
        ],
    },
    query: {
//        mediaType: "*"
    }
}

export default UploadDialog