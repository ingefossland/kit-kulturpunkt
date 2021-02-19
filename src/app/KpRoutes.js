import React from "react";
import { Switch, Route } from "react-router-dom";

import Finder from "./Finder"

import AppSettings from "./AppSettings"
import DocumentCreate from "./DocumentEditor"
import DocumentEditor from "./DocumentEditor"
import DocumentViewer from "./DocumentViewer"

import MediaEditor from "./MediaEditor"

const PrimusRoutes = (props) => {

    return (
        <Switch>
            <Route path="/:appName/settings" component={ AppSettings } />
            <Route path="/:appName/create" component={ DocumentCreate } />
            <Route path="/:appName/media/:parents*/:uniqueId/edit" component={ MediaEditor } />
            <Route path="/:appName/:parents*/:uniqueId/edit" component={ DocumentEditor } />
            <Route path="/:appName/:parents*/:uniqueId/view" component={ DocumentViewer } />
            <Route path="/:appName/:parents*" component={ Finder } />
            <Route path="/:appName" component={ Finder } />
        </Switch>
      )

}

export default PrimusRoutes