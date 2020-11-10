import { API } from "../settings"
import { createSlice } from '@reduxjs/toolkit'

const appSlice = createSlice({
    name: 'app',
    initialState: {
        isLoading: false,
        header: {
        },
        search: {
//            expanded: false
        },
        sidebar: {}
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


const getMenuUrls = ({children = [], urls = {}, level = 0}) => {

    if (!urls) {
        urls = {}
    }

    children.forEach((child) => {

        let item = {
            ...child,
            level: level
        }

        if (item.url) {
            urls[item.url] = item;
        }
      
        if (item.children) {
            urls = getMenuUrls({children: item.children, urls: urls, level: level++});
        }
    });

    return urls

}


export const getMenuByUrl = ({menu = []}) => dispatch => {

    dispatch(requestMenuByUrl())

    const menuByUrl = getMenuUrls({children: menu})

    dispatch(receiveMenuByUrl({menuByUrl: menuByUrl}))
    
}


export const { requestApp, receiveApp, toggleHeader, toggleSearch, toggleSidebar, requestSchemasByName, receiveSchemasByName, requestMenu, receiveMenu, requestMenuByUrl, receiveMenuByUrl, requestParents, receiveParents } = appSlice.actions
export default appSlice.reducer