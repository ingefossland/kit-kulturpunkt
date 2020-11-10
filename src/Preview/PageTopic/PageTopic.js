import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getModel } from '../../../redux/functions/model';

import PageLayout from "../Page/PageLayout"
import PageHeader from "../Page/PageHeader"
import PageBody from "../Page/PageBody"
import PageLinks from "../Page/PageLinks"

const PageTopic = ({formData, formContext, modelsById, ...props}) => {

    const language = formContext && formContext.currentLocale

    const content = formData && formData.content
    const media = content && content.titleImage && content.titleImage.media
    const links = content && content.links

    return (
        <PageLayout>
            <PageHeader {...content} media={media} language={language}></PageHeader>
            <PageBody {...content} language={language}></PageBody>
            <PageLinks links={links} language={language} />
        </PageLayout>
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
)(PageTopic);

