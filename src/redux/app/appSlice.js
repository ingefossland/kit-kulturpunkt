import { API } from "../settings"
import { createSlice } from '@reduxjs/toolkit'
import qs from 'query-string';

const appSlice = createSlice({
    name: 'app',
    initialState: {
        isLoading: false,
        header: {
        },
        search: {
//            expanded: false
        },
        sidebar: {
            expanded: true
        }
    }, 
    reducers: {
        requestApp(state, action) {
            return {
                ...state,
                isLoading: true,
            }
        },
        receiveApp(state, action) {
            return {
                ...state,
                isLoading: false,
                ...action.payload
            }
        },
        toggleSearch(state, action) {
//            const { expanded } = action.payload

            return {
                ...state,
                search: {
                    ...state.search,
                    expanded: !state.search.expanded,
                }
            }
        },
        toggleHeader(state, action) {
            const { expanded } = action.payload

            return {
                ...state,
                header: {
                    ...state.header,
                    expanded: expanded
                }
            }
        },
        toggleSidebar(state, action) {
            const { expanded } = action.payload

            return {
                ...state,
                sidebar: {
                    ...state.sidebar,
                    expanded: expanded
                }
            }
        },
        requestSchemasByName(state, action) {
            return {
                ...state,
                schemasByName: {}
            }
        },
        receiveSchemasByName(state, action) {
            const {schemasByName } = action.payload
            return {
                ...state,
                schemasByName: schemasByName
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
                menuByUrl:  menuByUrl
            }
        },
        receiveMenuItemByUrl(state, action) {
            const { url, ...item } = action.payload
            return {
                ...state,
                menuByUrl: {
                    ...state.menuByUrl,
                    [url]: item
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

export const getApp = ({menu = [], schemas = [], ...data}) => dispatch => {

    dispatch(requestApp())

    dispatch(receiveApp({
        ...data,
        menu: menu,
    }))

    menu && dispatch(getMenuByUrl({menu}))
    schemas && dispatch(getSchemasByName({schemas}))
    
}

    export const getAppLayout = (layout = "default") => dispatch => {

    if (layout === "editor") {
        dispatch(toggleHeader({expanded: false}))
        dispatch(toggleSidebar({expanded: false}))
    }

    if (layout === "finder") {
        dispatch(toggleHeader({expanded: true}))
        dispatch(toggleSidebar({expanded: true}))
    }

}

export const getAppSearch = ({expanded, q}) => dispatch => {
    dispatch(toggleSearch({expanded, q}))  
}

export const getParents = ({menuByUrl, pathname}) => dispatch => {

    dispatch(requestParents())

    let parents = [];
  
    const pathnames = pathname.split('/');
  
    let url = '';
  
    pathnames.forEach((path) => {

        if (path) {
            url = url + '/' + path;
        } else {
            url = '/';
        }
    
        if (menuByUrl && menuByUrl[url] && menuByUrl[url].title) {
            parents.push(menuByUrl[url]);
        }
        
        if (url == '/') {
            url = '';
        }

    });

    dispatch(receiveParents({parents:parents}))
  
}

export const getSchemasByName = ({schemas = []}) => dispatch => {

    dispatch(requestSchemasByName())

    let schemasByName = {}

    schemas.map(schema => {

        if (schema.name) {
            schemasByName[schema.name] = schema
        }

    })

    dispatch(receiveSchemasByName({schemasByName}))
    
}

const getMenuTree = (parent) => dispatch => {

    const { query } = parent

    const fetchUrl = API + '/admin/api/documents/search?' + qs.stringify({...query, fl: "id,title,uniqueId,parentId"});

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
    .then(results =>
        dispatch(getMenuTreeParent({parent, results}))
    )

}

const getMenuTreeParent = ({parent, results}) => dispatch => {
    const { models } = results;
    
    let children = []

    if (models) {
        models.map((model) => {

            const { id, title, uniqueId } = model;
            const { type, query } = parent
            const { collectionId, models } = query;
        
            let url;
        
            if (type === "documents/tree") {
        //        url = parent.url + "/tree/" + id
                url = parent.url + "/tree/" + uniqueId
             } else {
        //        url = parent.url + "/" + id
                url = parent.url + "/" + uniqueId
            }
        
            const child = {
                type: "documents/treeitem",
                id: id,
                uniqueId: uniqueId,
                url: url,
                title: title,
                query: {
                    collectionId: collectionId,
                    models: models,
                    parentId: id
                }
            }
            
            children.push(child)
        })
    
    }
    
    if (children.length) {
        dispatch(receiveMenuItemByUrl({...parent, count: children.length, children: children}))
        
        children.map((child) => {
            dispatch(receiveMenuItemByUrl(child))
        })
        
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

        dispatch(receiveMenuItemByUrl(item))

        /*

        if (item.type && item.type === "documents/tree") {
//            dispatch(getMenuTree(item))
            dispatch(receiveMenuItemByUrl(item))

        } else {

            if (item.children) {
                dispatch(getMenuChildren({children: item.children, level: level++}))
            }
    
            dispatch(receiveMenuItemByUrl(item))
    
        }

        */


    });

}


export const getMenuByUrl = ({menu = []}) => dispatch => {
    dispatch(requestMenuByUrl())
    dispatch(getMenuChildren({children: menu}))
}


export const { requestApp, receiveApp, toggleHeader, toggleSearch, toggleSidebar, requestSchemasByName, receiveSchemasByName, requestMenu, receiveMenu, requestMenuByUrl, receiveMenuByUrl, receiveMenuItemByUrl, requestParents, receiveParents } = appSlice.actions
export default appSlice.reducer