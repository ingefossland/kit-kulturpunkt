import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getModel } from '../../../redux/functions/model';

import PageMap from "../PageMap"

const PagePreview = ({formData, modelsById, ...props}) => {

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

    }, [modelsById])

    return (
        <PageMap links={newLinks} />
    )

}

const mapStateToProps = (state) => {
	return {
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
)(PagePreview);

