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
        receiveLayout(state, action) {
            const { header, sidebar } = action.payload
            return {
                ...state,
                header: header,
                sidebar: sidebar
            }
        },
        toggleSearch(state, action) {
            return {
                ...state,
                search: {
                    ...state.search,
                    expanded: !state.search.expanded,
                }
            }
        },
        toggleHeader(state, action) {
            return {
                ...state,
                header: {
                    ...state.header,
                    expanded: !state.header.expanded,
                }
            }
        },
        toggleSidebar(state, action) {
            return {
                ...state,
                sidebar: {
                    ...state.sidebar,
                    expanded: !state.sidebar.expanded,
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
            const { schemasByName } = action.payload
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
                menuByUrl: menuByUrl
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
        receiveMenuItemByUrl(state, action) {
            const { url, ...item } = action.payload
            return {
                ...state,
                menuByUrl: {
                    ...state.menuByUrl,
                    [url]: {
                        ...item,
                        url: url
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
        dispatch(receiveLayout({
            header: {
                expanded: false
            },
            sidebar: {
                expanded: false
            }
        }))
    }

    if (layout === "finder") {
        dispatch(receiveLayout({
            header: {
                expanded: true
            },
            sidebar: {
                expanded: true
            }
        }))
    }

}

export const getAppSearch = ({expanded, q}) => dispatch => {
    dispatch(toggleSearch({expanded, q}))  
}

export const getParents = ({pathname}) => (dispatch, getState) => {

    dispatch(requestParents())

    const state = getState()
    const menuByUrl = state.app.menuByUrl

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

export const getMenuItem = ({pathname}) => (dispatch, getState) => {

    const state = getState()
    const menuByUrl = state.app.menuByUrl

    const menuItem = menuByUrl && menuByUrl[pathname]

    if (menuItem && menuItem.type === "tree") {
        dispatch(getMenuTree(menuItem))
    }

    if (menuItem && menuItem.type === "treeitem") {
        dispatch(getMenuTree(menuItem))
    }

    
}
 
const getMenuTree = (parent) => dispatch => {

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
    .then(results => 
       dispatch(getMenuTreeChildren({parent, results}))
    )

}

const getMenuTreeChildren = ({parent, results}) => dispatch => {
    const { models } = results;


    let children = []

    if (models) {
        models.map((model) => {

            const { template, query } = parent
            const { collectionId, models } = query;

            const { id, title, uniqueId } = model;
                
            let url = parent.url + "/" + uniqueId;
        
            const child = {
                ...model,
                template: template,
                type: "treeitem",
                pathname: url,
                url: url,
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
        dispatch(receiveMenuItemByUrl({...parent, type: "tree", count: children.length, children: children}))
        
        children.map((child) => {
//            dispatch(receiveMenuItemByUrl(child))
            dispatch(getMenuTree(child))
        })
        
    } else {
        dispatch(receiveMenuItemByUrl({...parent, type: "treeitem"}))

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

    });

}


export const getMenuByUrl = ({menu = []}) => dispatch => {
    dispatch(requestMenuByUrl())
    dispatch(getMenuChildren({children: menu}))
}


export const { requestApp, receiveApp, receiveLayout, toggleHeader, toggleSearch, toggleSidebar, requestSchemasByName, receiveSchemasByName, requestMenu, receiveMenu, toggleMenuItem, requestMenuByUrl, receiveMenuByUrl, receiveMenuItemByUrl, requestParents, receiveParents } = appSlice.actions
export default appSlice.reducer