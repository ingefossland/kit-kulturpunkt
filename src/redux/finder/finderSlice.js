import { API } from "../settings"
import { createSlice } from '@reduxjs/toolkit'
import qs from 'query-string';
import { receiveSave } from "../modelsById/";

const finderByIdSlice = createSlice({
    name: 'finder',
    initialState: {
        isSorting: false,
        isLoading: false,
        parents: [],
        menuByUrl: {},
        menuById: {}
    }, 
    reducers: {
        requestFinder(state, action) {
            return {
                ...state,
                isLoading: true,
            }
        },
        receiveFinder(state, action) {
            return {
                ...state,
                isLoading: false,
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
                menuByUrl: {
                    ...state.menuByUrl,
                    [url]: {
                        isLoading: true,
                        ...item,
                    }
                }
            }
        },
        receiveMenuItem(state, action) {
            const { uniqueId, url, ...item } = action.payload

            const menuItem = {
                isLoading: false,
                uniqueId: uniqueId,
                url: url,
                ...item,
            }

            if (uniqueId) {
                return {
                    ...state,
                    menuByUrl: {
                        ...state.menuByUrl,
                        [url]: menuItem
                    },
                    menuById: {
                        ...state.menuById,
                        [uniqueId]: menuItem
                    }
                }
            }

            return {
                ...state,
                menuByUrl: {
                    ...state.menuByUrl,
                    [url]: menuItem
                }
            }
        },
        receiveMenuItemChildren(state, action) {
            const { url, count, children } = action.payload
            return {
                ...state,
                menuByUrl: {
                    ...state.menuByUrl,
                    [url]: {
                        ...state.menuByUrl[url],
                        count: count,
                        children: children
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
        requestParents(state, action) {
            return state            
        },
        receiveParents(state, action) {
            const { parents } = action.payload
            return {
                ...state,
                parents: parents
            }
        }
    }
})

export const getFinder = ({menu = []}) => dispatch => {
    dispatch(requestFinder())
    menu && dispatch(getMenuByUrl({menu}))
}

export const getParents = ({url}) => (dispatch, getState) => {

    dispatch(requestParents())

    const state = getState()
    const menuByUrl = state.finder.menuByUrl

    let parents = [];
  
    const pathnames = url.split('/')
    let urls = []
  
    pathnames.forEach((pathname) => {
        urls.push(pathname)
        const newUrl = urls.join('/')
    
        if (menuByUrl && menuByUrl[newUrl] && menuByUrl[newUrl].title) {
            parents.push(menuByUrl[newUrl]);
        }

    });

    dispatch(receiveParents({parents:parents}))
  
}

export const getMenuByUrl = ({menu = []}) => dispatch => {
    dispatch(requestMenuByUrl())
    dispatch(getMenuItem({children:menu}))
}

export const getMenuItem = (item) => (dispatch, getState) => {
    const { type = "default", url, children, level = 0} = item

    url && dispatch(requestMenuItem(item))

    if (type === "tree") {
        dispatch(getMenuTree(item))
    } else if (url && url.includes("/tree/")) {
        dispatch(getMenuTreeItem(item))
    } else if (children) {
        dispatch(getMenuChildren({children, level}))        
    } else if (url) {
        dispatch(receiveMenuItem(item))
    }
    
}

const getMenuChildren = ({children = [], level = 0}) => dispatch => {

    children.forEach((child) => {

        let item = {
            ...child,
            level: level
        }

        if (item.children) {
            dispatch(getMenuChildren({children: item.children, level: level++}))
        }

        dispatch(receiveMenuItem(item))

    });

}

const getMenuTreeItem = ({url}) => (dispatch, getState) => {
    const state = getState()
    const menuByUrl = state.finder.menuByUrl

    const pathnames = url.split('/')

    let urls = []

    // tree nodes

    pathnames.map(pathname => {
        urls.push(pathname)

        const newUrl = urls.join('/')
        const menuItem = menuByUrl[newUrl] || {}

        if (menuItem && menuItem.type === "tree") {
            dispatch(getMenuTree(menuItem))
        } else if (menuItem && menuItem.children) {

        } else if (pathname.length === 36) {

            dispatch(getMenuTreeNode({
                url: newUrl,
                uniqueId: pathname,
            }))
        }

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
            root: url,
            query: {
                models: "documents",
                parentId: model && model.id
            }
        }

        dispatch(getMenuTreeParent(parent))
    
    })

}

const getMenuTree = (item) => dispatch => {
    dispatch(getMenuTreeParent(item))
}

const getMenuTreeParent = (parent) => dispatch => {

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

        const children = models && models.map(child => {
            const { uniqueId } = child;

            const url = parent.root && parent.root + "/" + uniqueId || parent.url + "/tree/" + uniqueId

            child = {
                ...child,
                parentUrl: parent.url,
                url: url,
                type: "treeitem"
            }

            dispatch(getMenuTreeNode(child))

            return child

        })

        if (children && children.length) {
            dispatch(receiveMenuItem({
                ...parent,
                count: count,
                children: children
            }))
        } else {
            dispatch(receiveMenuItem(parent))
        }

    })

}

export const sortMenuTree = ({parent, child}) => dispatch => {

    const url = API + '/admin/api/documents';

    const formData = {
        uniqueId: child.uniqueId,
        parentId: parent.id,
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
        dispatch(getMenuTreeItem(parent))
    })

}

export const { requestFinder, receiveFinder, requestMenuByUrl, receiveMenuByUrl, requestMenuItem, receiveMenuItem, receiveMenuItemChildren, requestParents, receiveParents } = finderByIdSlice.actions
export default finderByIdSlice.reducer