import getMenuMedia from "./getMenuMedia"
import getMenuDocuments from "./getMenuDocuments"
import getMenuEkultur from "./getMenuDocuments"
import getMenuLatest from "./getMenuLatest"
import getMenuTrash from "./getMenuTrash"
import getMenuSearch from "./getMenuSearch"

export function getMenuChildren(props) {
    let children = []
  
    props.children.forEach((child) => {
        child = getMenuChild(child, props);
        children.push(child);
    });
    
    return children
    
}

export function getMenuChild(child, props) {
    let { root, parent } = props;

    if (!child) {
        return false;
    }
    
    let { type } = child;

    // url based on type

    if (type === "search") {
        child = getMenuSearch({...child})

    } else if (type === "documents") {
        child = getMenuDocuments({...child})

    } else if (type === "media") {
        child = getMenuMedia({...child, pathname: "media", mediaTypes: ["*"]})

    } else if (type === "media/image") {
        child = getMenuMedia({pathname: "image", ...child, mediaTypes: ["image"]})

    } else if (type === "media/video") {
        child = getMenuMedia({pathname: "video", ...child, mediaTypes: ["video"]})

    } else if (type === "media/audio") {
        child = getMenuMedia({pathname: "audio", ...child, mediaTypes: ["audio"]})

    } else if (type === "media/misc") {
        child = getMenuMedia({pathname: "misc", ...child, mediaTypes: ["misc"]})

    } else if (type === "media/application") {
        child = getMenuMedia({pathname: "apps", ...child, mediaTypes: ["application"]})

    } else if (type === "media/upload") {
        child = getMenuMedia({pathname: "upload", ...child, mediaTypes: ["*"], template: "upload", layout: "uploads"})

    } else if (type === "ekultur") {
        child = getMenuEkultur({...child})

    } else if (type === "latest") {
        child = getMenuLatest({...child})

    } else if (type === "trash") {
        child = getMenuTrash({...child})

    }
    
    // child props

    let { role, url, pathname, children, hidden, query } = child

    // query

    if (query && !query.collectionId) {
        query.collectionId = props.collectionId
    }

    // parent & role

    if (!parent && role) {
        role = role
    } else {
        role = undefined
    }

    // url based on pathname
    
    if (!url && pathname && pathname.startsWith('/')) {
        url = pathname;
    }

    if (!url && root && pathname) {
        url = root + '/' + pathname;
    }
  
    if (!url && root) {
        url = root;
    }

    // icon

    let { icon } = child

    if (parent && !parent.hidden) {
        icon = undefined
    }

    // hidden

    if (hidden) {
        url = undefined
    }

    // rootUrl

    const rootUrl = url || root

    child = {
        ...child,
        icon: icon,
        url: url,
        role: role,
        query: query,
        children: children && children.length && getMenuChildren({...props, children: children, root: rootUrl, parent: child}) || null
    }
      
    return child;
    
  }

  export default getMenuChildren