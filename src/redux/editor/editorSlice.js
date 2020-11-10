import { API } from "../settings"
import { createSlice } from '@reduxjs/toolkit'

import { requestModel, receiveModel } from "../modelsById"
import schema from "../../schemas/article/section/schema"

const editorSlide = createSlice({
    name: 'editor',
    initialState: {
        isLoading: false,
        isSaving: false,
        currentId: undefined,
        formData: {},
        dialog: {}
    }, 
    reducers: {
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
                    isLoading: false,
                    formData: {
                        ...formData,
                        uniqueId: uniqueId
                    }
                }
            } else {
                return {
                    ...state,
                    isLoading: false,
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
                    expanded: true,
                    id: id,
                    schema: schema,
//                    uiSchema: uiSchema,
                    formData: formData,
                    onChange: onChange
                },
            }
        }        
    }
})

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

export const { requestEdit, receiveEdit, requestSave, receiveSave, receiveCurrentId, requestDialog, receiveDialog } = editorSlide.actions
export default editorSlide.reducer