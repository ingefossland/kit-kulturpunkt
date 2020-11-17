import React from "react";
import { Switch, Route } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

import DocumentEditor from "./DocumentEditor"
import MediaEditor from "./MediaEditor"
import MediaUpload from "./MediaUpload"

import Finder from "../Finder/Finder"
import FinderQuery from "../Finder/FinderQuery"
import FinderTree from "../Finder/FinderTree"

const dialogMedia = {
    schema: {
        type: "object",
        properties: {
            mediaId: {
                type: "string"
            }
        }
    }
}

const templates = {
    "finder/query": FinderQuery,
    "finder/tree": FinderTree,
    "upload": MediaUpload
}


const AdminRoutes = (props) => {
    const { menuByUrl } = useSelector(state => state.app)
    const pathname = props.location.pathname

    const menuItem = menuByUrl && menuByUrl[pathname] || {}

    const { template, layout, query } = menuItem

    if (query) {

        const FinderTemplate = templates[template] || templates['finder/query']

        return (
            <Finder {...props}>
                <FinderTemplate {...props} {...menuItem}  />
            </Finder>
        )

    }

    return (
        <Switch>
            <Route path="/:appRoot/:parents*/upload" component={MediaUpload} />
            <Route path="/:appRoot/media/:parents*/:uniqueId/edit" component={ MediaEditor } />
            <Route path="/:appRoot/:parents*/:documentType/new" component={ DocumentEditor } />
            <Route path="/:appRoot/:parents*/:uniqueId/edit" component={ DocumentEditor } />
            <Route path="/:appRoot/calendar/:view/:date" component={Finder} />
            <Route path="/:appRoot/calendar/:view" component={Finder} />
            <Route path="/:appRoot/calendar" component={Finder} />
            <Route path="/:appRoot" component={Finder} />
        </Switch>
      )
}

export default AdminRoutes