import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getParents, toggleMenuItem } from '../redux/app';

import FinderLayout from "./FinderLayout"

import FinderModel from "./FinderModel"
import FinderQuery from "./FinderQuery"

import {
    DocumentTree,
    DocumentTreeChildren,
    DocumentTreeParent,
    DocumentTreeModule
} from "../components/DocumentTree"

const FinderTreeDetails = ({model}) => {

    const { uniqueId } = model;    
    const modelsById = useSelector(state => state.modelsById)
    const uniqueModel = modelsById && modelsById[uniqueId]

    return (
        <div>
            {JSON.stringify(uniqueModel)}
        </div>
    )


}

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
        <React.Fragment>
            <DocumentTreeParent {...treeModel} expanded={expanded} onClick={() => onSelect(treeModel)}>
                <FinderModel {...props} model={model} moduleComponent={DocumentTreeModule} />
            </DocumentTreeParent>
            { expanded && children &&
                <DocumentTreeChildren>
                    { children && children.map(child => <FinderTreeChild {...props} model={child} />) }
                </DocumentTreeChildren>
            }
        </React.Fragment>
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
        dispatch(getParents({pathname: url}))
    }

    const currentModel = currentTree && menuByUrl[currentTree]

    return (
        <FinderLayout {...props} parents={app && app.parents}>
            <DocumentTree>
            {children && children.map(child => {
                return (
                    <FinderTreeChild {...props} model={child} currentTree={currentTree} onSelect={_onSelect} />
                )
            })}
            <FinderTreeDetails model={currentModel} />
            </DocumentTree>
        </FinderLayout>
    )
    

}

FinderTree.defaultProps = {
}

export default FinderTree