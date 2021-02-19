import { API } from "../settings"
import { createSlice } from '@reduxjs/toolkit'
import { receiveModel, deleteModel, eraseModel } from "../modelsById"

const bulkSlice = createSlice({
    name: 'bulk',
    initialState: {
        items: [],
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
                        "publish",
                        "delete",
                        "erase"
                    ],
                    "enumNames": [
                        "** Multiple values **",
                        "Draft",
                        "Publish",
                        "Move to trash",
                        "Erase permanently"
                    ],
                    "default": false
                },
                "parentId": {
                    "type": "number",
                    "enum": [
                        false,
                        "null",
                    ],
                    "enumNames": [
                        "** Multiple values **",
                        "Reset to null",
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
    }, 
    reducers: {
        requestBulk(state, action) {
            return {
                ...state,
                items: [],
                count: 0,
                formData: {},
            }
        },
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
            const { uniqueId } = action.payload

            const bulkItems = state.items

            if (bulkItems.includes(uniqueId)) {
                return state
            }

            return {
                ...state,
                count: state.count + 1,
                items: [
                    ...bulkItems,
                    uniqueId
                ]
            }

        },
        bulkRemove(state, action) {
            const { uniqueId } = action.payload

            const bulkItems = state.items.filter(id => id !== uniqueId)

            return {
                ...state,
                count: bulkItems.length,
                items: bulkItems
            }

        },
    }
})

export const bulkToggle = ({uniqueId}) => (dispatch, getState) => {

    const state = getState()
    const bulkItems = state.bulk.items
    const selected = bulkItems.includes(uniqueId)

    if (selected) {
        dispatch(bulkRemove({uniqueId}))
    } else {
        dispatch(bulkAdd({uniqueId}))
    }

}

export const bulkReset = () => (dispatch) => {
    dispatch(requestBulk())
}

export const bulkSubmit = ({modelName = "documents", formData}) => (dispatch, getState) => {

    const state = getState()
    const bulkModels = Object.values(state.bulk.bulkById).filter(model => model.selected)
    const modelsById = state.modelsById

    bulkModels.map(model => {

        const uniqueId = model && model.uniqueId
        const uniqueModel = modelsById && modelsById[uniqueId]

        if (!uniqueModel) {
            return false
        }

        if (uniqueModel.modelName) {
            modelName = uniqueModel.modelName
        }

        let apiUrl = API + '/admin/api/documents' + modelName;

        let newFormData = {
            ...uniqueModel
        }

        Object.keys(formData).map(key => {

            if (formData[key]) {
                newFormData[key] = formData[key]
            }

            if (formData[key] === "null") {
                newFormData[key] = null
            }


        })

        const { status } = newFormData

        if (status === "delete") {
            dispatch(deleteModel(uniqueModel))

        } else if (status === "erase") {
            dispatch(eraseModel(uniqueModel))
    
        } else {

            fetch(apiUrl, {
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
                dispatch(receiveModel(formData))
            })    
    
        }

    

    })

    dispatch(requestBulk())


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

export const { requestBulk, receiveBulkEditor, bulkChange, bulkAdd, bulkRemove } = bulkSlice.actions
export default bulkSlice.reducer