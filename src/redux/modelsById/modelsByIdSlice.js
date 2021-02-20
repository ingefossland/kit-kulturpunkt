import { API } from "../settings"
import { createSlice } from '@reduxjs/toolkit'
import { bulkToggle } from '../bulk/'
import qs from 'query-string';


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
        receiveModelProps(state, action) {
            const { uniqueId, ...props } = action.payload

            return {
                ...state,
                [uniqueId]: {
                    ...state[uniqueId],
                    ...props
                }
            }

        },
        requestParents(state, action) {
            const { uniqueId } = action.payload

            return {
                ...state,
                [uniqueId]: {
                    ...state[uniqueId],
                    parents: []
                }
            }

        },
        receiveParents(state, action) {
            const { uniqueId, parents } = action.payload

            return {
                ...state,
                [uniqueId]: {
                    ...state[uniqueId],
                    parents: parents
                }
            }

        },
        requestChildren(state, action) {
            const { uniqueId } = action.payload

            return {
                ...state,
                [uniqueId]: {
                    ...state[uniqueId],
                    children: []
                }
            }

        },
        receiveChildren(state, action) {
            const { uniqueId, children } = action.payload

            return {
                ...state,
                [uniqueId]: {
                    ...state[uniqueId],
                    children: children
                }
           }

        },
        requestReferences(state, action) {
            const { uniqueId } = action.payload

            return {
                ...state,
                [uniqueId]: {
                    ...state[uniqueId],
                    references: []
                }
            }

        },
        receiveReferences(state, action) {
            const { uniqueId, references } = action.payload

            return {
                ...state,
                [uniqueId]: {
                    ...state[uniqueId],
                    references: references
                }
           }

        },
        receiveParentId(state, action) {
            const { uniqueId, parentId } = action.payload

            return {
                ...state,
                [uniqueId]: {
                    ...state[uniqueId],
                    parentId: parentId
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

/** Get models from a list of results */

export const getModels = ({models}) => (dispatch, getState) => {

    const state = getState()
    const modelsById = state.modelsById

    models && models.map(model => {
        const { modelName, uniqueId } = model

        if (modelName && uniqueId && !modelsById[uniqueId]) {
            dispatch(getModel({modelName: modelName, uniqueId: uniqueId}))
        }


    })

}



/** Get model from uniqueId */

export const getModel = ({modelName = "documents", id, uniqueId, source, sourceId}) => dispatch => {

    uniqueId && dispatch(requestModel({uniqueId}))

    if (!uniqueId && sourceId) {
        uniqueId = sourceId
    } else if (!uniqueId && id) {
        uniqueId = id
    }

    const apiUrl = API + '/admin/api/' + modelName + '/' + uniqueId;

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
        .then(formData => {

            let { uniqueId, source, sourceId } = formData

            if (!uniqueId && source && sourceId) {
                uniqueId = source + "/" + sourceId
            }


            dispatch(receiveModel({...formData, uniqueId: uniqueId, modelName}))
//            dispatch(getParents({...formData, modelName}))
//            dispatch(getChildren({...formData, modelName}))
        })

}

/** Get parents from uniqueId */

export const getParents = ({modelName = "documents", uniqueId, id, parentId, parents}) => dispatch => {

    const apiUrl = API + '/admin/api/' + modelName + '/' + parentId;
    
    if (!parents) {
        dispatch(requestParents({uniqueId}))
        parents = []
    }

    if (parentId && parentId !== id) {
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
            .then(parent => {

                parent && parent.uniqueId && parents.unshift(parent)

                dispatch(getParents({parentId: parent.parentId, id, uniqueId, parents}))

                /*
                
                if (parent && parent.parentId && parent.parentId !== parentId) {
                    dispatch(getParents({parentId: parent.parentId, id, uniqueId, parents}))
                }  else {
                    dispatch(receiveParents({uniqueId, parents}))
                }*/

            })
    
    } else {
        dispatch(receiveParents({uniqueId, parents}))
    }

}

/** Get children from uniqueId */

export const getChildren = ({modelName = "documents", uniqueId, id}) => (dispatch, getState) => {

    const query = qs.stringify({
        fl: "id,parentId,uniqueId,title",
        parentId: id,
    })

    const apiUrl = API + '/admin/api/' + modelName + '/search?' + query;

    dispatch(requestChildren({uniqueId}))
    
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
            results.models && dispatch(receiveChildren({uniqueId, children: results.models}))
        })

}

/** Get references from uniqueId */

export const getReferences = ({modelName = "documents", uniqueId}) => dispatch => {

    const url = API + '/admin/api/references/' + modelName + '/' + uniqueId;

    dispatch(requestReferences({uniqueId}))

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
            dispatch(receiveReferences({...formData, uniqueId}))
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

export const selectModel = ({modelName, uniqueId, selected, ...props}) => (dispatch, getState) => {

    /*
    dispatch(receiveModelProps({
        modelName: modelName,
        uniqueId: uniqueId,
        selected: !selected
    }))
    */

    dispatch(bulkToggle({uniqueId}))


}

/** Set parentId */

export const setParentId = ({modelName = "documents", uniqueId, parentId}) => dispatch => {
//    dispatch(receiveParentId({uniqueId, parentId}))

    const url = API + '/admin/api/' + modelName;

    const formData = {
        uniqueId: uniqueId,
        parentId: parentId,
    }

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

export const { 
    requestModel, receiveModel, 
    receiveModelProps,
    requestParents, receiveParents, 
    requestChildren, receiveChildren, 
    requestReferences, receiveReferences, 
    receiveStatus, receiveParentId,
    requestSave, receiveSave
} = modelsByIdSlice.actions
export default modelsByIdSlice.reducer