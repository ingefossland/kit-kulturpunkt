import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getLayout } from '../redux/app';
import { getModel } from '../redux/modelsById';
import { getQuery } from '../redux/searchByUrl';

import FinderLayout from "./FinderLayout"
import FinderQuery from "./FinderQuery"
import View from "./View"

import FinderModel from "./FinderModel"
import { IconsView, IconsModule } from "@kit-ui/admin"


const Finder = (props) => {
    const pathname = props.location.pathname

    const app = useSelector(state => state.app)
    const finder = useSelector(state => state.finder)
    const modelsById = useSelector(state => state.modelsById)
    const searchByUrl = useSelector(state => state.searchByUrl)

    const { uniqueId } = props.match.params

    useEffect(() => {
        uniqueId && dispatch(getQuery({
            url: pathname,
            models: "documents",
            collectionId: app && app.collectionId,
            uniqueId: uniqueId,
            fl: "id,title,uniqueId,parentId"
        }))

    }, [uniqueId])

    const uniqueModel = modelsById && modelsById[uniqueId] || {}
    const id = uniqueModel && uniqueModel.id

    const parentId = uniqueModel && uniqueModel.parentId

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getLayout("finder"))
    }, [])

    const parentQuery = {
        models: "documents",
        uniqueId: parentId,
    };

    const q1 = {
        url: pathname + "/parents",
        models: "documents",
        collectionId: app && app.collectionId,
        q: "id:"+parentId,
        fl: "id,title,uniqueId,parentId"
    };

    const q2 = {
        url: pathname + "/children",
        models: "documents",
        collectionId: app && app.collectionId,
        parentId: id,
        fl: "id,title,uniqueId,parentId"
    };

    useEffect(() => {
        parentId && dispatch(getQuery(q1))
        id && dispatch(getQuery(q2))
    }, [parentId])


    const parents = searchByUrl && searchByUrl[q1.url] || {}
    const parentUniqueId = parents && parents.resultsLoaded && parents.resultsLoaded[0]
    const parentModel = parentUniqueId && modelsById && modelsById[parentUniqueId]

    const children = searchByUrl && searchByUrl[q2.url] || {}
    
    return (
        <FinderLayout parents={[...finder.parents, uniqueModel]}>


            {parentModel && 
            
                <IconsView>
                    <FinderModel {...props} model={parentModel}>
                        <IconsModule />
                    </FinderModel>
                </IconsView>
            
            }
            


            <IconsView>
                <FinderModel {...props} model={uniqueModel}>
                    <IconsModule />
                </FinderModel>
            </IconsView>

            <View {...props} {...children} view="list" title="Barn" />
        </FinderLayout>
    )

    return (
        <FinderQuery {...props} />
    )

}

Finder.defaultProps = {
}

export default Finder