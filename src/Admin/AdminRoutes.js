import React from "react";
import { Switch, Route } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

import FinderLoader from "../Finder/FinderLoader"
import DocumentEditor from "./DocumentEditor"
import MediaEditor from "./MediaEditor"

const AdminRoutes = (props) => {

    return (
        <Switch>
            <Route path="/:appRoot/media/:parents*/:uniqueId/edit" component={ MediaEditor } />
            <Route path="/:appRoot/:parents*/new" component={ DocumentEditor } />
            <Route path="/:appRoot/:parents*/:uniqueId/edit" component={ DocumentEditor } />
            <Route path="/:appRoot/:parents*" component={ FinderLoader } />
            <Route path="/:appRoot" component={ FinderLoader } />
        </Switch>
      )
}

export default AdminRoutes