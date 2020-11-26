import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAppLayout } from '../redux/app';
import { getModel } from '../redux/modelsById';
import { getQuery } from '../redux/searchById';

import FinderLayout from "./FinderLayout"
import FinderQuery from "./FinderQuery"
import View from "./View"

import FinderModel from "./FinderModel"
import { GridViewHeader, GridViewFooter, GridViewList, GridModule } from "../components"
import { ListViewModule } from "../components"


const Finder = (props) => {
    const pathname = props.location.pathname

    const app = useSelector(state => state.app)
    const finder = useSelector(state => state.finder)
    const modelsById = useSelector(state => state.modelsById)
    const searchById = useSelector(state => state.searchById)

    const { uniqueId } = props.match.params

    useEffect(() => {
        uniqueId && dispatch(getQuery({
            id: pathname,
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
        dispatch(getAppLayout("finder"))
    }, [])

    const parentQuery = {
        models: "documents",
        uniqueId: parentId,
    };

    const q1 = {
        id: pathname + "/parents",
        models: "documents",
        collectionId: app && app.collectionId,
        q: "id:"+parentId,
        fl: "id,title,uniqueId,parentId"
    };

    const q2 = {
        id: pathname + "/children",
        models: "documents",
        collectionId: app && app.collectionId,
        parentId: id,
        fl: "id,title,uniqueId,parentId"
    };

    useEffect(() => {
        parentId && dispatch(getQuery(q1))
        id && dispatch(getQuery(q2))
    }, [parentId])


    const parents = searchById && searchById[q1.id] || {}
    const parentUniqueId = parents && parents.resultsLoaded && parents.resultsLoaded[0]
    const parentModel = parentUniqueId && modelsById && modelsById[parentUniqueId]

    const children = searchById && searchById[q2.id] || {}
    
    return (
        <FinderLayout parents={[...finder.parents, uniqueModel]}>


            {parentModel && 
            
                <GridViewList>
                    <FinderModel {...props} model={parentModel}>
                        <GridModule />
                    </FinderModel>
                </GridViewList>
            
            }
            


            <GridViewList>
                <FinderModel {...props} model={uniqueModel}>
                    <GridModule />
                </FinderModel>
            </GridViewList>

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