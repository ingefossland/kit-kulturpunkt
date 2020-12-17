import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import qs from 'query-string';

import MediaEditor from "../Finder/MediaEditor"
import DocumentEditor from "../Finder/DocumentEditor"
import CollectionEditor from "../Finder/CollectionEditor"

const FinderEditor = (props) => {
    const { uniqueId } = props.match.params
    const sq = props.location.search && qs.parse(props.location.search) || {}

    const modelsById = useSelector(state => state.modelsById)
    const uniqueModel = uniqueId && modelsById && modelsById[uniqueId]

    if (uniqueModel && uniqueModel.documentType || sq.documentType) {

        return (
            <DocumentEditor {...props} />
        )

    }

    if (uniqueModel && uniqueModel.mediaType) {

        return (
            <MediaEditor {...props} />
        )

    }


    if (uniqueModel && uniqueModel.collectionType || sq.collectionType) {

        return (
            <CollectionEditor {...props} />
        )

    }

    return (
        <DocumentEditor {...props} />
    )

    return (
        <p>Unknown editor for { uniqueId } </p>
    )    

}

FinderEditor.defaultProps = {
}

export default FinderEditor