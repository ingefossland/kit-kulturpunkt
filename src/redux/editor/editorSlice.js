import { API } from "../settings"
import { createSlice } from '@reduxjs/toolkit'

import { requestModel, receiveModel } from "../modelsById"
import schema from "../../schemas/article/section/schema"

const editorSlide = createSlice({
    name: 'editor',
    initialState: {
        isLoading: true,
        isSaving: undefined,
        pathname: undefined,
        uniqueId: undefined,
        parents: [],
        currentId: undefined,
        schema: {},
        uiSchema: {},
        formData: {},
        dialog: {}
    }, 
    reducers: {
        requestEditor(state, action) {
            const { pathname } = action.payload
            return {
                ...state,
                pathname: pathname,
                isLoading: true,
            }
        },
        receiveEditor(state, action) {
            const { pathname, uniqueId } = action.payload
            return {
                ...state,
                pathname: pathname,
                uniqueId: uniqueId,
                isLoading: false,
            }
        },
        requestParents(state, action) {
            return state            
        },
        receiveParents(state, action) {
            const { parents } = action.payload
            return {
                ...state,
                parents: parents
            }
        },
        requestEdit(state, action) {
            const { uniqueId } = action.payload

            return {
                isLoading: true,
                formData: {
                    uniqueId: uniqueId
                }
            }

        },
        receiveEdit(state, action) {
            const { uniqueId, ...formData } = action.payload

            if (uniqueId) {
                return {
                    ...state,
                    formData: {
                        ...formData,
                        uniqueId: uniqueId
                    }
                }
            } else {
                return {
                    ...state,
                    formData: formData
                }
            }

        },
        requestSave(state, action) {
           return {
                ...state,
                isSaving: true,
            }

        },
        receiveSave(state, action) {
            const { uniqueId, ...formData } = action.payload

            return {
                isSaving: false,
                formData: {
                    ...formData,
                    uniqueId: uniqueId
                }
            }
        },
        receiveCurrentId(state, action) {
            const { currentId } = action.payload
            return {
                ...state,
                currentId: currentId,
            }
        },
        requestDialog(state, action) {
            return {
                ...state,
                dialog: {},
            }
        },
        receiveDialog(state, action) {
            const { id, schema, uiSchema, formData, onChange } = action.payload
            return {
                ...state,
                dialog: {
                    id: id,
                    expanded: true,
                    schema: schema,
                    uiSchema: uiSchema,
                    formData: formData,
                    onChange: onChange
                },
            }
        }        
    }
})

export const getEditor = ({pathname, uniqueId, schema, uiSchema}) => (dispatch, getState) => {
    dispatch(requestEditor({pathname}))

    const state = getState()
    const app = state.app
    const finder = state.finder

    dispatch(getParents({url: pathname, uniqueId}))

    schema && uiSchema && dispatch(receiveEditor({pathname, uniqueId}))

}

export const getParents = ({url, uniqueId}) => (dispatch, getState) => {

    const state = getState()
    const menuByUrl = state.finder.menuByUrl
    const menuById = state.finder.menuById

    const pathnames = url.split('/');
    pathnames.pop()

    const parentUrl = pathnames.join("/")

    let parents = []

    let parent = menuByUrl[parentUrl] || menuById[pathnames.length-1]

    // find parent by last child

    if (parent) {

        console.log('parents by last child', parent)

        while (parent) {
            parents.push(parent)
            parent = parent.parentId && menuById[parent.parentId] || !parent.id && parent.parentUrl && menuByUrl[parent.parentUrl]
        }

        parents = parents.reverse()

    } else {

        let path = [], pathUrl

        pathnames.map(pathname => {

            path.push(pathname)
            pathUrl = path.join('/')

            console.log('parents by path', pathUrl)


            if (menuByUrl[pathUrl]) {
                parents.push(menuByUrl[pathUrl])
            }

        })


    }


    if (uniqueId) {
        parents = parents.filter(parent => parent.uniqueId !== uniqueId)
    }


    dispatch(receiveParents({parents}))
  
}

/** Edit model from uniqueId */

export const editModel = ({modelName = "documents", uniqueId, ...formData}) => dispatch => {

    const url = API + '/admin/api/' + modelName + '/' + uniqueId;

    if (uniqueId) {
        dispatch(requestEdit({uniqueId}))
        
        fetch(url, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json; charset=utf-8",
            }})
            .then(
                response => response.json(),
                error => console.log('An error occurred.', error)
            )
            .then(formData => {
                dispatch(receiveEdit(formData))
                dispatch(receiveModel(formData))
            })

    } else if (formData) {
        dispatch(receiveEdit(formData))
    }

}

/** Save model from formData  */

export const saveModel = ({modelName = "documents", ...formData}) => dispatch => {
    const url = API + '/admin/api/' + modelName;

    dispatch(requestSave())

    fetch(url, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(formData)
    })
    .then(
        response => response.json(),
        error => console.log('An error occurred.', error)
    )
    .then(formData => {
        dispatch(receiveSave(formData))
        dispatch(receiveModel(formData))
    })

}

export const { 
    requestEditor, receiveEditor, 
    requestParents, receiveParents,
    receiveCurrentId, 
    requestEdit, receiveEdit, 
    requestSave, receiveSave, 
    requestDialog, receiveDialog
} = editorSlide.actions
export default editorSlide.reducer