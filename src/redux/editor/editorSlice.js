import { API } from "../settings"
import { createSlice } from '@reduxjs/toolkit'
import { requestModel, receiveModel, getModel } from "../modelsById"
import qs from 'query-string';

const editorSlide = createSlice({
    name: 'editor',
    initialState: {
        modelName: undefined,
        uniqueId: undefined,
        isLoading: true,
        isSaving: false,
        formData: {},
        formContext: {
        },
        dialog: {}
    }, 
    reducers: {
        requestEditor(state, action) {
            const { modelName, uniqueId } = action.payload
            return {
                ...state,
                isLoading: true,
                modelName: modelName,
                uniqueId: uniqueId,
            }
        },
        receiveEditor(state, action) {
            const { uniqueId, ...formData } = action.payload
            return {
                ...state,
                isLoading: false,
                formData: {
                    uniqueId: uniqueId,
                    ...formData
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
                uniqueId: uniqueId,
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

export const getEditor = ({modelName, uniqueId, ...formData}) => (dispatch) => {
    dispatch(requestEditor({modelName, uniqueId}))

    const url = API + '/admin/api/' + modelName + '/' + uniqueId;

    if (modelName && uniqueId) {
        
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
                dispatch(receiveEditor({...formData, modelName}))
                dispatch(getModel({...formData, modelName}))
            })

    } else if (formData) {
        dispatch(receiveEditor({...formData, modelName}))
    }
    
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