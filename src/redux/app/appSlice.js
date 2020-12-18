import { API } from "../settings"
import { createSlice } from '@reduxjs/toolkit'
import qs from 'query-string';

import { getMenu, getPrimaryAction } from "../finder/"

const appSlice = createSlice({
    name: 'app',
    initialState: {
        icon: undefined,
        isLoading: true,
        title: undefined,
        siteName: undefined,
        siteTitle: undefined,
        siteId: undefined,
        collectionId: undefined,
        header: {
        },
        subview: {
            expanded: false
        },
        search: {
        },
        sidebar: {
        }
    }, 
    reducers: {
        requestApp(state, action) {
            const { root, icon, title, siteName, collectionType } = action.payload
            return {
                root: root,
                icon: icon,
                title: title,
                siteName: siteName,
                collectionType: collectionType,
                isLoading: true,
            }
        },
        receiveAppSite(state, action) {
            const { id, title } = action.payload
            return {
                ...state,
                siteId: id,
                siteTitle: title
            }
        },
        receiveAppCollection(state, action) {
            const { id } = action.payload
            return {
                ...state,
                collectionId: id,
            }
        },
        receiveApp(state, action) {
            return {
                ...state,
                isLoading: false,
                ...action.payload
            }
        },
        requestSubview(state, action) {
            return {
                ...state,
                subview: undefined,
            }
        },
        receiveSubview(state, action) {
            const { subview } = action.payload
            return {
                ...state,
                subview: {
                    ...state.subview,
                    ...subview
                },
            }
        },
        requestLayout(state, action) {
            return {
                ...state,
            }
        },
        receiveLayout(state, action) {
            const { header, sidebar, subview } = action.payload
            return {
                ...state,
                header: header,
                sidebar: sidebar,
                subview: subview
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

export const getApp = (app) => dispatch => {
    dispatch(requestApp(app))
    dispatch(getAppProperties(app))
}

export const getSiteApp = (app) => dispatch => {
    dispatch(requestApp(app))
    dispatch(getAppSite(app))
}

export const getAppSite = ({siteName, ...app}) => dispatch => {

    const query = qs.stringify({
        name: siteName,
        fl: "id,name,title"
    })

    const apiUrl = API + '/admin/api/sites/search?' + query;

    fetch(apiUrl, {
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
        const site = results.models && results.models[0] || {}

        dispatch(receiveAppSite(site))

        dispatch(getAppCollection({
            ...app,
            siteId: site.id,
            siteName: site.name,
            siteTitle: site.title
        }))

    })

}

export const getAppCollection = ({siteId, collectionType, ...app}) => dispatch => {

    const query = qs.stringify({
        siteId: siteId,
        collectionType: collectionType,
        fl: "id,name,title"
    })

    const apiUrl = API + "/admin/api/collections/search?" + query;

    fetch(apiUrl, {
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
        const collection = results.models && results.models[0] || {}

        dispatch(receiveAppCollection(collection))

        dispatch(getAppProperties({
            ...app,
            collectionId: collection.id,
        }))

    })

}

export const getAppProperties = (app) => dispatch => {

    dispatch(receiveApp(app))
//    dispatch(getMenu(app))

//    dispatch(getMenu(app))
//    dispatch(getPrimaryAction(app))


}


export const getSubview = (subview) => dispatch => {

    dispatch(receiveSubview({
        subview: subview
    }))
    

}

export const getLayout = (layout = "default") => dispatch => {

    if (layout === "editor") {
        dispatch(receiveLayout({
            header: {
                expanded: false
            },
            sidebar: {
                expanded: false
            },
            subview: {
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
            },
            subview: {
                expanded: false
            }
        }))
    }

    if (layout === "finder/subview") {
        dispatch(receiveLayout({
            header: {
                expanded: true
            },
            sidebar: {
                expanded: false
            },
            subview: {
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

/*
export const getMenuByUrl = ({menu = []}) => dispatch => {
    dispatch(requestMenuByUrl())
    dispatch(getMenuChildren({children: menu}))
}*/


export const { 
    requestApp, receiveApp, 
    receiveAppSite, receiveAppCollection, 
    requestLayout, receiveLayout, 
    requestSubview, receiveSubview, 
    toggleHeader, 
    toggleSearch, 
    toggleSidebar, 
    requestSchemasByName, 
    receiveSchemasByName, 
    requestMenu, receiveMenu, 
    toggleMenuItem, requestMenuByUrl, 
    receiveMenuByUrl, receiveMenuItemByUrl, 
    requestParents, receiveParents
} = appSlice.actions
export default appSlice.reducer