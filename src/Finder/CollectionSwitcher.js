import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCollection } from '../redux/collection';

import FinderQuery from "./FinderQuery"

const CollectionItem = ({model = {}}) => {

    const dispatch = useDispatch()

    const _onClick = () => {
        dispatch(getCollection(model))
    }

    return (
        <div onClick={_onClick}>
            <p>{model.title}</p>
        </div>
    )

}

const CollectionList = ({layout = "list", resultsLoaded, onPage, ...props}) => {

    return (
        <div>
            {resultsLoaded && resultsLoaded.map((model, index) => <CollectionItem model={model} key={index} />)}
        </div>
    )

}


const CollectionSwitcher = ({query, ...props}) => {


    return (
        <FinderQuery query={query} template={CollectionList} {...props} />
    )



    return (
        <p>Switch collection</p>
    )

}

export default CollectionSwitcher