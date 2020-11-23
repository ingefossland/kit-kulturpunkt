import { API } from "../settings"
import { createSlice } from '@reduxjs/toolkit'
import qs from 'query-string';
import { saveModel } from "../modelsById/";

const finderByIdSlice = createSlice({
    name: 'finder',
    initialState: {
        isLoading: true,
        pathname: undefined,
        sortOptions: [],
        sort: undefined,
        rowsOptions: [
            10,
            20,
            30,
            40,
            50,
        ],
        rows: undefined,
        viewOptions: [],
        view: undefined,
        menu: [],
        parents: [],
        parentsByUrl: {},
        menuByUrl: {},
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
        receiveView(state, action) {
            const { view } = action.payload
            return {
                ...state,
                view: view
            }
        },
        requestViewOptions(state, action) {
            return {
                ...state,
                viewOptions: undefined,
                view: undefined
            }
        },
        receiveViewOptions(state, action) {
            const { viewOptions, view } = action.payload
            return {
                ...state,
                viewOptions: viewOptions,
                view: view
            }
        },
        receiveSort(state, action) {
            const { sort } = action.payload
            return {
                ...state,
                sort: sort
            }
        },
        requestSortOptions(state, action) {
            return {
                ...state,
                sortOptions: undefined,
                sort: undefined
            }
        },
        receiveSortOptions(state, action) {
            const { sortOptions, sort } = action.payload
            return {
                ...state,
                sortOptions: sortOptions,
                sort: sort
            }
        },
 
        requestParents(state, action) {
            return state            
        },
        receiveParents(state, action) {
            const { parents, parentsByUrl } = action.payload
            return {
                ...state,
                parents: parents,
                parentsByUrl: parentsByUrl
            }
        },
        requestMenu(state, action) {
            return {
                ...state,
                menu: []
            }
        },
        receiveMenu(state, action) {
            const { menu } = action.payload
            return {
                ...state,
                menu: menu
            }
        },
        requestMenuByUrl(state, action) {
            return {
                ...state,
                menuByUrl: {}
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
        expandMenuItem(state, action) {
            const { url } = action.payload
            return {
                ...state,
                menuByUrl: {
                    ...state.menuByUrl,
                    [url]: {
                        ...state.menuByUrl[url],
                        expanded: true
                    }
                }
            }
        },
        collapseMenuItem(state, action) {
            const { url } = action.payload
            return {
                ...state,
                menuByUrl: {
                    ...state.menuByUrl,
                    [url]: {
                        ...state.menuByUrl[url],
                        expanded: false
                    }
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

export const getFinder = ({pathname = undefined}) => (dispatch, getState) => {

    const state = getState()
    const menuByUrl = state.finder.menuByUrl
    const menuItem = menuByUrl && menuByUrl[pathname]

    menuItem && dispatch(getParents(menuItem)) || dispatch(getParents({url: pathname}))
    menuItem && dispatch(getOptions(menuItem))

    dispatch(receiveFinder({pathname}))

}

export const getOptions = ({viewOptions, sortOptions}) => (dispatch) => {
    dispatch(requestViewOptions())
    dispatch(requestSortOptions())

    viewOptions && dispatch(receiveViewOptions({viewOptions, view: viewOptions[0]}))
    sortOptions && dispatch(receiveSortOptions({sortOptions, sort: sortOptions[0]}))
}

export const getView = ({pathname, view}) => (dispatch, getState) => {
    const state = getState()
    const menuByUrl = state.finder.menuByUrl
    const menuItem = menuByUrl && menuByUrl[pathname]

    dispatch(receiveView({view}))
   
}

export const getSort = ({pathname, sort}) => (dispatch, getState) => {
    const state = getState()
    const menuByUrl = state.finder.menuByUrl
    const menuItem = menuByUrl && menuByUrl[pathname]

    dispatch(receiveSort({sort}))
}

export const getMenu = ({menu, root, collectionId}) => (dispatch) => {

    const getChild = ({parent, children, url, pathname, query, viewOptions, sortOptions, ...item}) => {

        if (!url && parent.url) {
            url = pathname && parent.url + "/" + pathname || parent.url + "/"
        } else if (!url) {
            url = pathname && parent.root + "/" + pathname
        }

        if (query) {
            query = {
                ...query,
                collectionId: query.collectionId || parent.collectionId
            }
        }

        if (query && query.models === "media") {
            viewOptions = viewOptions || ["gallery", "list"]
            sortOptions = sortOptions || ["title", "createdAt ASC", "updatedAt DESC"]
        }

        if (query && query.models === "documents") {
            viewOptions = viewOptions || ["list", "grid", "column"]
            sortOptions = sortOptions || ["title", "createdAt ASC", "updatedAt DESC"]
        }

        if (sortOptions) {
            query.sort = sortOptions[0]
        }
        
        const child = {
            ...item,
            root: parent.root,
            url: url,
            query: query,
            viewOptions: viewOptions,
            sortOptions: sortOptions
        }

        const menuItem = {
            ...child,
            children: children && children.length && getChildren({...child, children: children})
        }

        dispatch(getMenuItem(menuItem))

        return menuItem

    }

    const getChildren = (parent) => {
        let children = []
  
        parent.children.forEach((child) => {
            child = getChild({...child, parent});
            children.push(child);
        });
        
        return children
    }

    const rootMenu = getChildren({
        root: root,
        children: menu,
        collectionId: collectionId
    })

    dispatch(receiveMenu({menu: rootMenu}))


    /*

    dispatch(requestMenuByUrl())

    menu && menu.map(item => {
        dispatch(getMenuItem({...item, level: 1}))
    })
    */
    
}

export const getParents = ({url}) => (dispatch, getState) => {
    dispatch(requestParents())

    const state = getState()
    const menuByUrl = state.finder.menuByUrl
    const menuById = state.finder.menuById

    let parent = url && menuByUrl && menuByUrl[url] 

    let parents = [];

    while (parent) {
        parents.push(parent)
        parent = parent.parentId && menuById[parent.parentId] || !parent.id && parent.parentUrl && menuByUrl[parent.parentUrl]
    }

    parents = parents.reverse()

    let parentsByUrl = {}

    parents.map(parent => {
        if (parent.url) {
            parentsByUrl[parent.url] = parent
        }
    })

    dispatch(receiveParents({parents, parentsByUrl}))
  
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
    requestMenu, receiveMenu,
    requestViewOptions, receiveViewOptions, receiveView,
    requestSortOptions, receiveSortOptions, receiveSort,
    requestMenuByUrl, receiveMenuByUrl, 
    requestMenuTree, receiveMenuTree, 
    requestMenuTreeItem, receiveMenuTreeItem, 
    requestMenuItem, receiveMenuItem, 
    moveMenuItem,
    expandMenuItem, collapseMenuItem, toggleMenuItem, 
    requestParents, receiveParents } = finderByIdSlice.actions
export default finderByIdSlice.reducer