import React from "react";
import { Switch, Route } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

import Finder from "../Finder/Finder"
import MediaEditor from "../Finder/MediaEditor"

import DocumentEditor from "../Finder/DocumentEditor"
import DocumentPreview from "../Finder/DocumentPreview"
import DocumentLinks from "../Finder/DocumentLinks"

const AdminRoutes = (props) => {

    return (
        <Switch>
            <Route path="/:appRoot/media/:parents*/:uniqueId/edit" component={ MediaEditor } />
            <Route path="/:appRoot/:parents*/new" component={ DocumentEditor } />
            <Route path="/:appRoot/:parents*/:uniqueId/edit" component={ DocumentEditor } />
            <Route path="/:appRoot/:parents*/:uniqueId/view" component={ DocumentPreview } />
            <Route path="/:appRoot/:parents*/:uniqueId/link" component={ DocumentLinks } />
            <Route path="/:appRoot/:parents*" component={ Finder } />
            <Route path="/:appRoot" component={ Finder } />
        </Switch>
      )
}

export default AdminRoutes