import { API } from "../settings"
import { createSlice } from '@reduxjs/toolkit'
import { requestModel, receiveModel, getModel } from "../modelsById"
import qs from 'query-string';

const editorSlide = createSlice({
    name: 'editor',
    initialState: {
        isLoading: true,
//        isSaving: undefined,
        pathname: undefined,
        collectionId: undefined,
        uniqueId: undefined,
        parents: [],
        currentId: undefined,
        schema: {},
        uiSchema: {},
        formData: {},
        formContext: {
            isLoading: true,
            isSaving: undefined,
        },
        dialog: {}
    }, 
    reducers: {
        requestEditor(state, action) {
            const { pathname } = action.payload
            return {
                ...state,
                pathname: pathname,
                isLoading: true,
                formContext: {
                    ...state.formContext,
                    isLoading: true
                }
            }
        },
        receiveEditor(state, action) {
            const { pathname, uniqueId, languages } = action.payload
            return {
                ...state,
                pathname: pathname,
                uniqueId: uniqueId,
                isLoading: false,
                formContext: {
                    ...state.formContext,
                    languages: languages,
                    isLoading: false
                }
            }
        },
        requestParents(state, action) {
            return state            
        },
        receiveParents(state, action) {
            const { parents } = action.payload
            return {
                ...state,
                parents: parents,
                formContext: {
                    ...state.formContext,
                    parents: parents
                }
            }
        },
        requestChildren(state, action) {
            return state            
        },
        receiveChildren(state, action) {
            const { children } = action.payload
            return {
                ...state,
                children: children,
                formContext: {
                    ...state.formContext,
                    children: children
                }
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
                    uniqueId: uniqueId,
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
                formContext: {
                    ...state.formContext,
                    isSaving: true
                }
            }

        },
        receiveSave(state, action) {
            const { uniqueId, ...formData } = action.payload

            return {
                ...state,
                isSaving: false,
                formData: {
                    ...formData,
                    uniqueId: uniqueId
                },
                formContext: {
                    ...state.formContext,
                    isSaving: false
                }
            }
        },
        receiveChange(state, action) {
            const { formData } = action.payload

            return {
                ...state,
                formData: formData
            }

        },
        receiveCurrentId(state, action) {
            const { currentId } = action.payload
            return {
                ...state,
                currentId: currentId,
                formContext: {
                    ...state.formContext,
                    currentId: currentId,
                }
            }
        },
        receiveCurrentLocale(state, action) {
            const { currentLocale } = action.payload
            return {
                ...state,
                currentLocale: currentLocale,
                formContext: {
                    ...state.formContext,
                    currentLocale: currentLocale,
                }
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

    dispatch(getParents({url: pathname, uniqueId}))

    schema && uiSchema && dispatch(receiveEditor({pathname, uniqueId, languages: app.languages}))

}

export const getChildren = ({modelName = "documents", id}) => (dispatch, getState) => {

    const query = qs.stringify({
        parentId: id,
    })

    const apiUrl = API + '/admin/api/' + modelName + '/search?' + query;

    dispatch(requestChildren())
    
    fetch(apiUrl, {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json; charset=utf-8",
        }})
        .then(
            response => response.json(),
            error => console.log('An error occurred.', error)
        )
        .then(results => {
            results.models && dispatch(receiveChildren({children: results.models}))
        })


}

export const getParents = ({url, uniqueId, id, parentId, parents = []}) => (dispatch, getState) => {

    const state = getState()
    const menuByUrl = state.finder.menuByUrl
    const menuById = state.finder.menuById

    const pathnames = url.split('/');
    pathnames.pop()

    const parentUrl = pathnames.join("/")

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
                dispatch(receiveEdit({...formData, modelName}))
                dispatch(getModel({...formData, modelName}))
            })

    } else if (formData) {
        dispatch(receiveEdit({...formData, modelName}))
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
        dispatch(receiveSave({...formData, modelName}))
        dispatch(getModel({...formData, modelName}))
    })

}

export const { 
    requestEditor, receiveEditor, 
    requestParents, receiveParents,
    requestChildren, receiveChildren,
    receiveChange,
    receiveCurrentId, 
    receiveCurrentLocale,
    requestEdit, receiveEdit, 
    requestSave, receiveSave, 
    requestDialog, receiveDialog
} = editorSlide.actions
export default editorSlide.reducer