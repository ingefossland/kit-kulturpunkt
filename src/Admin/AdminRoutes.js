import React from "react";
import { Switch, Route } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

import DocumentEditor from "./DocumentEditor"
import MediaEditor from "./MediaEditor"
import MediaUpload from "./MediaUpload"
import Finder from "../Finder/Finder"

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
    "finder": Finder,
}


const AdminRoutes = (props) => {
    const { menuByUrl } = useSelector(state => state.app)
    const pathname = props.location.pathname

    const menuItem = menuByUrl && menuByUrl[pathname] || {}

    const { template, layout, query } = menuItem

    if (query) {

        const AdminTemplate = templates[template] || templates['finder']

        return (
            <AdminTemplate {...props} layout={layout} query={{
                ...query,
                id: pathname
            }} />
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