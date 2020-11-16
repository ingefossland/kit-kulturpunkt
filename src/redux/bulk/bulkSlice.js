import { API } from "../settings"
import { createSlice } from '@reduxjs/toolkit'
import { receiveModel } from "../modelsById"

const bulkSlice = createSlice({
    name: 'bulk',
    initialState: {
        count: 0,
        isLoading: false,
        isSaving: false,
        formData: {

        },
        schema: {

        },
        bulkSchema: {
            "type": "object",
            "properties": {
                "status": {
                    "type": "string",
                    "enum": [
                        false,
                        "draft",
                        "publish"
                    ],
                    "enumNames": [
                        "** Multiple values **",
                        "Draft",
                        "Publish"
                    ],
                    "default": false
                },
                "documentType": {
                    "type": "string",
                    "enum": [
                        false,
                        "pageMap",
                        "pageTopic"
                    ],
                    "enumNames": [
                        "** Multiple values **",
                        "pageMap",
                        "pageTopic"
                    ],
                    "default": false
                }
            }
        },
        bulk: [],
        bulkById: {}
    }, 
    reducers: {
        receiveBulkEditor(state, action) {
            const { schema, formData } = action.payload

            return {
                ...state,
                formData: formData,
                schema: schema
            }

        },
        bulkChange(state, action) {
            const { formData } = action.payload

            return {
                ...state,
                formData: formData,
            }

        },
        bulkAdd(state, action) {
            const { uniqueId, status, documentType } = action.payload

            return {
                ...state,
                count: state.count + 1,
                bulkById: {
                    ...state.bulkById,
                    [uniqueId]: {
                        uniqueId: uniqueId,
                        documentType: documentType,
                        status: status,
                        selected: true
                    }
                }
            }

        },
        bulkRemove(state, action) {
            const { uniqueId } = action.payload

            return {
                ...state,
                count: state.count - 1,
                bulkById: {
                    ...state.bulkById,
                    [uniqueId]: {
                        selected: false
                    }
                }
            }

        },
    }
})

export const bulkToggle = ({uniqueId}) => (dispatch, getState) => {

    const state = getState()
    const bulkById = state.bulk.bulkById

    const modelsById = state.modelsById
    const uniqueModel = modelsById && modelsById[uniqueId]

    const selected = bulkById && bulkById[uniqueId] && bulkById[uniqueId].selected

    if (selected) {
        dispatch(bulkRemove(uniqueModel))
        dispatch(getBulkEditor())
    } else {
        dispatch(bulkAdd(uniqueModel))
        dispatch(getBulkEditor())
    }

}

export const bulkSubmit = ({modelName = "documents", formData}) => (dispatch, getState) => {

    const state = getState()
    const bulkModels = Object.values(state.bulk.bulkById).filter(model => model.selected)
    const modelsById = state.modelsById

    const url = API + '/admin/api/' + modelName;

    bulkModels.map(model => {

        const uniqueId = model && model.uniqueId
        const uniqueModel = modelsById && modelsById[uniqueId]

        if (!uniqueModel) {
            return false
        }

        const newFormData = {
            ...uniqueModel,
            ...formData
        }

        fetch(url, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify(newFormData)
        })
        .then(
            response => response.json(),
            error => console.log('An error occurred.', error)
        )
        .then(formData => {
//            dispatch(receiveSave(formData))
            dispatch(receiveModel(formData))
        })    
    

    })


}

export const getBulkEditor = () => (dispatch, getState) => {

    const state = getState()
    const bulkModels = Object.values(state.bulk.bulkById).filter(model => model.selected)

    console.log('BULK', bulkModels)

    const bulkSchema = state.bulk.bulkSchema

    let properties = {}, formData = {}, multiple = {}

    bulkModels.map(model => {

        Object.keys(bulkSchema.properties).map(key => {

            const value = model[key]
            const property = properties[key] || bulkSchema.properties[key]

            // set formData

            if (formData[key] && formData[key] !== value) {
                formData[key] = false
                multiple[key] = true
            } else if (!multiple[key] && !formData[key]) {
                formData[key] = value
            }

            // set schema

            if (property && value) {

                if (property.enum && !property.enum.includes(value)) {
                    properties[key] = {
                        ...property,
                        enum: [
                            ...property.enum,
                            value
                        ],
                        enumNames: [
                            ...property.enumNames,
                            value
                        ]
                    }

                } else {
                    properties[key] = property
                }

            }

        })

    })

    const schema = {
        ...bulkSchema,
        properties: {
            ...properties
        }
    }

    dispatch(receiveBulkEditor({schema, formData}))


}

export const { receiveBulkEditor, bulkChange, bulkAdd, bulkRemove } = bulkSlice.actions
export default bulkSlice.reducer