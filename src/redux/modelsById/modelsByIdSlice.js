import { API } from "../settings"
import { createSlice } from '@reduxjs/toolkit'

const modelsByIdSlice = createSlice({
    name: 'modelsById',
    initialState: {
    }, 
    reducers: {
        requestModel(state, action) {
            const { uniqueId } = action.payload

            return {
                ...state,
                [uniqueId]: {
                    isLoading: true,
                }
            }

        },
        receiveModel(state, action) {
            const { uniqueId } = action.payload

            return {
                ...state,
                [uniqueId]: {
                    isLoading: false,
                    ...action.payload
                }
            }

        },
        receiveStatus(state, action) {
            const { uniqueId, status } = action.payload

            return {
                ...state,
                [uniqueId]: {
                    ...state[uniqueId],
                    status: status
                }
            }

        },
        toggleSelected(state, action) {
            const { uniqueId } = action.payload

            const selected = state[uniqueId] && state[uniqueId].selected

            return {
                ...state,
                [uniqueId]: {
                    ...state[uniqueId],
                    selected: !selected
                }
            }

        },
        requestSave(state, action) {
            const { uniqueId } = action.payload

            return {
                ...state,
                [uniqueId]: {
                    ...state[uniqueId],
                    isSaving: true
                }

            }

        },
        receiveSave(state, action) {
            const { uniqueId } = action.payload

            return {
                ...state,
                [uniqueId]: {
                    isSaving: false,
                    ...action.payload
                }
            }
        }        
    }
})

/** Get model from uniqueId */

export const getModel = ({modelName = "documents", uniqueId}) => dispatch => {

    const url = API + '/admin/api/' + modelName + '/' + uniqueId;

    dispatch(requestModel({uniqueId}))

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
            dispatch(receiveModel(formData))
        })

}
/** Load model from uniqueId */

export const loadModel = ({modelName = "documents", uniqueId}) => dispatch => {

    const url = API + '/admin/api/' + modelName + '/' + uniqueId;

    dispatch(requestModel({uniqueId}))

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
            dispatch(receiveModel(formData))
        })

}

/** Save model from formData  */

export const saveModel = ({modelName = "documents", ...formData}) => dispatch => {
    const url = API + '/admin/api/' + modelName;

    formData && formData.uniqueId && dispatch(requestSave({uniqueId: formData.uniqueId}))

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
    })

}

/** Delete */

export const deleteModel = ({modelName, uniqueId}) => dispatch => {
    const url = API + '/admin/api/' + modelName + '/' + uniqueId;
  
    fetch(url, {
        method: "DELETE",
    })
    .then(
        error => console.log('An error occurred.', error)
    )
    .then(data =>
        dispatch(loadModel({modelName, uniqueId}))
    )

}

/** Restore */

export const restoreModel = ({modelName, uniqueId}) => dispatch => {
    const url = API + '/admin/api/' + modelName + '/restore/' + uniqueId;
  
    fetch(url, {
        method: "POST",
    })
    .then(
        error => console.log('An error occurred.', error)
    )
    .then(data =>
        dispatch(loadModel({modelName, uniqueId}))
    )

}

/** Erase */

export const eraseModel = ({modelName, uniqueId}) => dispatch => {
    const url = API + '/admin/api/' + modelName + '/' + uniqueId + "?erase=true";
  
    fetch(url, {
        method: "DELETE",
    })
    .then(
        error => console.log('An error occurred.', error)
    )
    .then(data =>
        dispatch(receiveStatus({modelName, uniqueId, status: "erased"}))
    )

}

/** Select */

export const selectModel = ({modelName, uniqueId}) => dispatch => {
    dispatch(toggleSelected({modelName, uniqueId}))
}

/** Document source */

export const getDocumentSource = (model, callback = undefined) => dispatch => {
    const { collectionId, sourceId } = model;    

    let url = API + '/admin/api/documents/search?collectionId=' + collectionId + "&sourceId=" +sourceId;

    fetch(url, {
        method: "GET",
        headers: {
        "Accept": "application/json",
        "Content-Type": "application/json; charset=utf-8",
        },
    })
    .then(
        response => response.json(),
        error => console.log('An error occurred.', error)
    )
    .then(data => {

        if (data.models && data.models[0]) {
            dispatch(receiveModel(data.models[0]))
            callback && callback(data.models[0])
        } else {
            dispatch(addDocumentSource(model, callback))
        }

    })

}

export const addDocumentSource = (model, callback = undefined) => dispatch => {
    const url = API + '/admin/api/documents'

    model = {
        ...model,
        source: model.source.toLowerCase(),
        schemaId: 1
    }

    delete model.uniqueId
    
    const payload = JSON.stringify(model);

    console.log(payload);

    return function (dispatch) {
        fetch(url, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json; charset=utf-8",
            },
            body: payload
        })
        .then(
            response => response.json(),
            error => console.log('An error occurred.', error)
        )
        .then(data => {
            dispatch(receiveModel(data))
            callback && callback(data)
        })
    }

}

/** Media source */

export const getMediaSource = (model, callback = undefined) => dispatch => {
    const { collectionId, sourceId } = model;    

    let url = API + '/admin/api/media/search?collectionId=' + collectionId + "&sourceId=" +sourceId;

    fetch(url, {
        method: "GET",
        headers: {
        "Accept": "application/json",
        "Content-Type": "application/json; charset=utf-8",
        },
    })
    .then(
        response => response.json(),
        error => console.log('An error occurred.', error)
    )
    .then(data => {

        if (data.models && data.models[0]) {
            dispatch(receiveModel(data.models[0]))
            callback && callback(data.models[0])
        } else {
            dispatch(addMediaSource(model, callback))
        }

    })

}

export const addMediaSource = (model, callback = undefined) => dispatch => {
    const url = API + '/admin/api/media'

    model = {
        ...model,
        source: model.source.toLowerCase(),
        schemaId: 1
    }

    delete model.uniqueId
    
    const payload = JSON.stringify(model);

    console.log(payload);

    return function (dispatch) {
        fetch(url, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json; charset=utf-8",
            },
            body: payload
        })
        .then(
            response => response.json(),
            error => console.log('An error occurred.', error)
        )
        .then(data => {
            dispatch(receiveModel(data))
            callback && callback(data)
        })
    }

}

export const { requestModel, receiveModel, receiveStatus, toggleSelected, requestSave, receiveSave } = modelsByIdSlice.actions
export default modelsByIdSlice.reducer