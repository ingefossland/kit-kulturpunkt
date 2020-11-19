import { API } from "../settings"
import { createSlice } from '@reduxjs/toolkit'
import qs from 'query-string';
import { saveModel } from "../modelsById/";

const finderByIdSlice = createSlice({
    name: 'finder',
    initialState: {
        isLoading: false,
        pathname: undefined,
        parents: [],
        menuByUrl: undefined,
        menuById: {},
    }, 
    reducers: {
        requestFinder(state, action) {
            const { pathname } = action.payload
            return {
                ...state,
                pathname: pathname,
                isLoading: true,
            }
        },
        receiveFinder(state, action) {
            const { pathname } = action.payload
            return {
                ...state,
                pathname: pathname,
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
        requestMenuByUrl(state, action) {
            return {
                ...state,
//                menuByUrl: {}
            }
        },
        receiveMenuByUrl(state, action) {
            const { menuByUrl } = action.payload
            return {
                ...state,
                menuByUrl: menuByUrl
            }
        },
        requestMenuItem(state, action) {
            const { url, ...item } = action.payload
            return {
                ...state,
                isLoading: true,
                menuByUrl: {
                    ...state.menuByUrl,
                    [url]: {
                        isLoading: true,
                        url: url,
                        ...item,
                    }
                }
            }
        },
        receiveMenuItem(state, action) {
            const { id, url, ...item } = action.payload

            const count = item.children && item.children.length || null

            if (id) {
                return {
                    ...state,
                    isLoading: false,
                    menuById: {
                        ...state.menuById,
                        [id]: {
                            ...item,
                            id: id,
                            isLoading: false,
                            url: url,
                            count: count,
                        }
                    },
                    menuByUrl: {
                        ...state.menuByUrl,
                        [url]: {
                            ...item,
                            id: id,
                            isLoading: false,
                            count: count,
                            url: url,
                        }
                    }
                }
            }

            return {
                ...state,
                isLoading: false,
                menuByUrl: {
                    ...state.menuByUrl,
                    [url]: {
                        ...item,
                        id: id,
                        count: count,
                        isLoading: false,
                        url: url,
                    }
                }
            }
        },
        moveMenuItem(state, action) {
            const { source, destination } = action.payload

            return {
                ...state,
                menuByUrl: {
                    ...state.menuByUrl,
                    [source.url]: source,
                    [destination.url]: destination  
                }
            }

        },
        toggleMenuItem(state, action) {
            const { url } = action.payload
            return {
                ...state,
                menuByUrl: {
                    ...state.menuByUrl,
                    [url]: {
                        ...state.menuByUrl[url],
                        expanded: !state.menuByUrl[url].expanded
                    }
                }
            }

        },
    }
})

export const getFinder = ({menu, pathname = undefined}) => (dispatch, getState) => {

    const state = getState()
    const menuByUrl = state.finder.menuByUrl
    const menuItem = menuByUrl && menuByUrl[pathname]

    !menuByUrl && dispatch(requestFinder({pathname}))

    menu && menu.map(item => {
        dispatch(getMenuItem({...item, level: 1}))
    })

    menuItem && dispatch(getParents(menuItem)) || dispatch(getParents({url: pathname}))

    dispatch(receiveFinder({pathname}))

}


export const getParents = ({url}) => (dispatch, getState) => {
    dispatch(requestParents())

    const state = getState()
    const menuByUrl = state.finder.menuByUrl
    const menuById = state.finder.menuById

    let parent = url && menuByUrl && menuByUrl[url] 

    if (!parent && url) {
        const pathnames = url.split('/');
  
        let path = [], parentUrl;

        pathnames.forEach((pathname) => {
            path.push(pathname)
            parentUrl = path.join("/")
        
            if (menuByUrl && menuByUrl[parentUrl]) {
                parent = menuByUrl[parentUrl]
            }
        })
        
    }

    let parents = [];

    while (parent) {
        parents.push(parent)
        parent = parent.parentId && menuById[parent.parentId] || !parent.id && parent.parentUrl && menuByUrl[parent.parentUrl]
    }

    dispatch(receiveParents({parents: parents.reverse()}))
  
}

export const getMenuItem = (item) => (dispatch) => {
    const { type = "default", url, children} = item

    if (type === "tree") {
        dispatch(getMenuTree(item))
    } else if (children) {
        dispatch(getMenuParent(item))        
    } else if (url) {
        dispatch(getMenuChild(item))
    } 
    
}

const getMenuParent = ({children, level = 0, ...parent}) => dispatch => {
    dispatch(requestMenuItem(parent))

    children.map((child) => {
        dispatch(getMenuItem({
            ...child,
            parentUrl: parent.url,
            level: level + 1
        }))
    })

    dispatch(receiveMenuItem({
        ...parent,
        children: children,
        level: level,
    }))
}

const getMenuChild = ({level, ...child}) => dispatch => {
    dispatch(requestMenuItem(child))
    dispatch(receiveMenuItem({
        ...child,
        level: level
    }))
}

export const getMenuTree = ({level = 0, ...parent}) => dispatch => {

    dispatch(requestMenuItem(parent))

    const { query } = parent
    const fetchUrl = API + '/admin/api/documents/search?' + qs.stringify({...query, fl: "modelName,documentType,id,title,uniqueId,parentId"});

    fetch(fetchUrl, {
        method: "GET",
        headers: {
        "Accept": "application/json",
        },
    })
    .then(
        response => response.json(),
        error => console.log('An error occurred.', error)
    )
    .then(results => {
        const { models, count } = results

        const parentUrl = parent.url

        const children = models && models.map(child => {
            const { uniqueId } = child;

            child = {
                ...child,
                level: level + 1,
                parentId: parentUrl,
                parentUrl: parentUrl,
                url: parentUrl + "/" + uniqueId,
                type: "treeitem"
            }

            dispatch(getMenuTreeNode(child))

            return child

        })

        dispatch(receiveMenuItem({
            ...parent,
            id: parentUrl,
            level: level,
            parentUrl: parentUrl,
            children: children,
            count
        }))

    })

}

export const getMenuTreeNode = (item) => (dispatch) => {

    const { url, uniqueId } = item

    const query = {
        models: "documents",
        uniqueId: uniqueId
    }

    const fetchUrl = API + '/admin/api/documents/search?' + qs.stringify({...query, fl: "modelName,documentType,id,title,uniqueId,parentId"});

    fetch(fetchUrl, {
        method: "GET",
        headers: {
        "Accept": "application/json",
        },
    })
    .then(
        response => response.json(),
        error => console.log('An error occurred.', error)
    )
    .then(results => {
        const model = results.models && results.models[0]
        const parent = {
            ...item,
            ...model,
            type: "treeitem",
            url: url,
            query: {
                models: "documents",
                parentId: model && model.id
            }
        }

        dispatch(getMenuTreeChildren(parent))
    
    })

}

export const getMenuTreeChildren = ({level = 0, ...parent}) => (dispatch) => {

    dispatch(requestMenuItem(parent))

    const { parentUrl } = parent

    const query = {
        models: "documents",
        parentId: parent.id
    }

    const fetchUrl = API + '/admin/api/documents/search?' + qs.stringify({...query, fl: "modelName,documentType,id,title,uniqueId,parentId"});

    fetch(fetchUrl, {
        method: "GET",
        headers: {
        "Accept": "application/json",
        },
    })
    .then(
        response => response.json(),
        error => console.log('An error occurred.', error)
    )
    .then(results => {
        const { models, count } = results

        const children = models && models.map(child => {
            const { uniqueId } = child;

            child = {
                ...child,
                parentUrl: parentUrl,
                level: level + 1,
                url: parentUrl + "/" + uniqueId,
                type: "treeitem"
            }

            dispatch(receiveMenuItem(child))

            return child

        })

        if (children && children.length) {
            parent = {
                ...parent,
                level: level,
                count: count,
                children: children
            }
        }
 
        dispatch(receiveMenuItem({
            ...parent,
            level: level
        }))
         
    })

}

export const sortMenuTree = ({source, destination, item}) => (dispatch, getState) => {

    const state = getState()
    const finder = state.finder
    const menuByUrl = finder.menuByUrl
    const menuById = finder.menuById

    const itemNode = item.id && menuById[item.id]

    let sourceNode = source.url && {
        ...menuByUrl[source.url],
        children: [...menuByUrl[source.url].children]
    }

    sourceNode.children.splice(source.index, 1)

    let destinationNode = destination.url && {
        ...menuByUrl[destination.url],
        children: menuByUrl[destination.url].children && [...menuByUrl[destination.url].children, itemNode] || [itemNode]
    }


    dispatch(receiveMenuItem({
        ...sourceNode,
    }))

    dispatch(receiveMenuItem({
        ...destinationNode,
    }))

    dispatch(receiveMenuItem({
        ...itemNode,
        parentUrl: destinationNode.url,
        parentId: destinationNode.id
    }))

    const id = itemNode.id;
    const parentId = destinationNode.id

    if (id && parentId === destinationNode.url) {
        dispatch(saveModel({
            id: id,
            parentId: null
        }))
    } else if (id && parentId) {
        dispatch(saveModel({
            id: id,
            parentId: parentId
        }))
    }

}

export const { 
    requestFinder, receiveFinder, 
    requestMenuByUrl, receiveMenuByUrl, 
    requestMenuTree, receiveMenuTree, 
    requestMenuTreeItem, receiveMenuTreeItem, 
    requestMenuItem, receiveMenuItem, 
    toggleMenuItem, moveMenuItem,
    requestParents, receiveParents } = finderByIdSlice.actions
export default finderByIdSlice.reducer