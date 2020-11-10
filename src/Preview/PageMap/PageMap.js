import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getModel } from '../../redux/modelsById';

import PageLayout from "../Page/PageLayout"
import PageHeader from "../Page/PageHeader"
import PageBody from "../Page/PageBody"


import DefaultMap from "./DefaultMap"
import RoundtripMap from "./RoundtripMap"

const mapTypes = {
    "default": DefaultMap,
    "roundtrip": RoundtripMap
}

const PageMap = ({formData, formContext, modelsById, ...props}) => {

    const links = formData && formData.content && formData.content.links

    useEffect(() => {

        links && links.map(link => {
            const referenceId = link && link.referenceId;
            const referenceModel = referenceId && modelsById[referenceId]

            if (referenceId && !referenceModel) {
                props.getModel("documents", referenceId)
            }
        })

    }, [links])

    const [newLinks, setNewLinks] = useState([])

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

    
    return (
        <PageLayout>
            <PageHeader {...content} language={language}></PageHeader>
            {newLinks && newLinks.length && <MapTemplate links={newLinks} /> }
            <PageBody {...content} language={language} />
        </PageLayout>
    )

}

const mapStateToProps = (state) => {
	return {
         formData: state.editor.formData,
        modelsById: state.modelsById
    };
}  

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({
    getModel
  }, 
dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PageMap);

