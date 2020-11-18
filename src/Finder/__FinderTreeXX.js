import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAppLayout, getParents, getMenuItem } from '../redux/app';
import { getMenu } from '../redux/finder';

import { getModel, setParentId } from '../redux/modelsById';

import SortableTree from "../components/DocumentTree/SortableTree"

const FinderTree = ({layout = "list", ...props}) => {
    const dispatch = useDispatch()

    const app = useSelector(state => state.app)
    const menuByUrl = app.menuByUrl;

    const pathname = props.location.pathname
    const parent = menuByUrl[pathname]

    const uniqueId = parent && parent.uniqueId

    useEffect(() => {
        dispatch(getAppLayout("finder"))
        dispatch(getParents({pathname}))
        uniqueId && dispatch(getModel(parent))
    }, [parent])

    const modelsById = useSelector(state => state.modelsById)


    const documentTree = {}

    
    const parents = app && app.parents && app.parents.map(parent => {
        const { uniqueId, url, children } = parent;
        const uniqueModel = uniqueId && modelsById && modelsById[uniqueId]
        const selected = pathname.startsWith(url) || pathname === url

        return {
            ...parent,
            ...uniqueModel,
            selected: selected || true,
            children: children && children.map(child => {
                const { uniqueId, url, children } = child;
                const menuModel = menuByUrl[url]
                const uniqueModel = uniqueId && modelsById && modelsById[uniqueId]
                const selected = pathname.includes(url) || pathname === url

                return {
                    ...child,
                    ...menuModel,
                    ...uniqueModel,
                    selected: selected
                }
        
            })
        }
    });

    const _onSelect = ({url}) => {
        url && props.history.push(url)
    }

    const _onSort = ({parent, child}) => {

        const uniqueId = child && child.uniqueId
        const parentId = parent && parent.id

        if (uniqueId && parentId) {
            dispatch(setParentId({uniqueId, parentId}))
        }

    }

    return <SortableTree pathname={pathname} parents={parents} onSelect={_onSelect} onSort={_onSort} />

}

FinderTree.defaultProps = {
}

export default FinderTree