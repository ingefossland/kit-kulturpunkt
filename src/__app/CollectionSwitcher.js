import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCollection } from '../redux/collection';

import Link from "@material-ui/core/Link"

import FinderQuery from "../Finder/FinderQuery"
import FinderModel from "../Finder/FinderModel"

import { ModuleBase, ModuleTitle, ModuleDescription, ListView } from "@kit-ui/admin"

const CollectionSwitcher = ({query, ...props}) => {

    const _onSelect = ({url}) => {
        url && props.history.push(url)
    }

    const CollectionItem = ({id, siteName, title, collectionType}) => {

        const kpUrl = "/"+siteName+"/kp"
        const kioskUrl = "/"+siteName+"/kiosk"
        
        const kpLink = <Link onClick={() => _onSelect({url: kpUrl})}>KulturPunkt</Link>
        const kioskLink = <Link onClick={() => _onSelect({url: kioskUrl})}>Kiosk</Link>

        return (
            <ModuleBase>
                <ModuleTitle>{title}</ModuleTitle>
                <ModuleDescription>CollectionId: {id} – SiteName: {siteName} – {kpLink} – {kioskLink}</ModuleDescription>
            </ModuleBase>
        )
    
    }
    
    const CollectionList = ({layout = "list", resultsLoaded, onPage, ...props}) => {

        return (
            <ListView>
                {resultsLoaded && resultsLoaded.map((model, index) => <FinderModel model={model}><CollectionItem model={model} key={index} /></FinderModel>)}
            </ListView>
        )
    
    }

    const parents = [{title: "Switch collection"}]
    
    return (
        <FinderQuery parents={parents} query={query} template={CollectionList} {...props} />
    )


}

CollectionSwitcher.defaultProps = {
    query: {
        models: "collections",
        siteId: "*",
        collectionId: "*",
        collectionType: "kp",
        fl: "id,uniqueId,title,collectionType,siteName,siteId",
        status: "NOT trash"
    }
}

export default CollectionSwitcher