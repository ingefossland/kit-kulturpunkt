import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getModel } from '../../../redux/modelsById';

import PageLayout from "../Page/PageLayout"
import PageHeader from "../Page/PageHeader"
import PageBody from "../Page/PageBody"


import DefaultMap from "./DefaultMap"
import RoundtripMap from "./RoundtripMap"

const mapTypes = {
    "default": DefaultMap,
    "roundtrip": RoundtripMap
}

const PageMap = ({formData, formContext, ...props}) => {

    const dispatch = useDispatch()
    const modelsById = useSelector(state => state.modelsById)
   
    const links = formData && formData.content && formData.content.links

    const [newLinks, setNewLinks] = useState([])

    useEffect(() => {

        links && links.map(link => {
            const referenceId = link && link.referenceId;
            const referenceModel = referenceId && modelsById[referenceId]

            if (referenceId && !referenceModel) {
                dispatch(getModel({modelName: "documents", uniqueId: referenceId}))
            }
        })

    }, [links])


    useEffect(() => {

        const newLinks = links && links.map(link => {
            const referenceId = link && link.referenceId;
            const referenceModel = referenceId && modelsById[referenceId]

            const location = referenceModel && referenceModel.content && referenceModel.content.location

            return {
                ...link,
                ...location,
                reference: referenceModel
            }

        })

        setNewLinks(newLinks)        

    }, [modelsById, links])

    const language = formContext && formContext.currentLocale
    const content = formData && formData.content

    const mapLayout = content && content.mapLayout
    const MapTemplate = mapLayout && mapTypes[mapLayout] || DefaultMap

    if (!newLinks) {
        return <p>No links to display</p>
    }

    return <MapTemplate links={newLinks} />
    
    return (
        <PageLayout>
            <PageHeader {...content} language={language}></PageHeader>
            {newLinks && newLinks.length && <MapTemplate links={newLinks} /> }
            <PageBody {...content} language={language} />
        </PageLayout>
    )

}

export default PageMap

