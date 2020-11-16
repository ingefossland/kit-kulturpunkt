import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleMenuItem } from '../redux/app';

import Finder from "./Finder"

import FinderModel from "./FinderModel"

import {
    DocumentTree,
    DocumentTreeChildren,
    DocumentTreeParent,
    DocumentTreeModule
} from "../components/DocumentTree"


const FinderTreeChild = ({model, ...props}) => {

    const { currentTree, onSelect } = props

    const dispatch = useDispatch()

    const app = useSelector(state => state.app)
    const menuByUrl = app.menuByUrl;

    const treeModel = menuByUrl && menuByUrl[model.url]

    model = {
        ...model,
        ...treeModel,
    }

    const { children, url } = model;    

    const expanded = currentTree.startsWith(url) || currentTree === url

    return (
        <DocumentTree>
            <DocumentTreeParent {...treeModel} expanded={expanded} onClick={() => onSelect(treeModel)}>
                <FinderModel {...props} model={model} moduleComponent={DocumentTreeModule} />
            </DocumentTreeParent>
            <DocumentTreeChildren>{ children && children.map(child => <FinderTreeChild {...props} model={child} />) }</DocumentTreeChildren>
        </DocumentTree>
    )


}

const FinderTree = ({url, query, layout = "list", ...props}) => {
    const dispatch = useDispatch()
    const app = useSelector(state => state.app)
    const menuByUrl = app.menuByUrl;

    const parent = menuByUrl && menuByUrl[url]

    const { children } = parent;    

    const [currentTree, setCurrentTree] = useState(url)

    const _onSelect = ({url}) => {
        url && setCurrentTree(url)
    }

    return (
        <Finder {...props}>
            <DocumentTree>
                {children && children.map(child => {
                    return (
                        <FinderTreeChild {...props} model={child} currentTree={currentTree} onSelect={_onSelect} />
                    )
                })}
            </DocumentTree>
        </Finder>
    )
    

}

FinderTree.defaultProps = {
}

export default FinderTree