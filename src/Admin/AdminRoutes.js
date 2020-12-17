import React from "react";
import { Switch, Route } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

import Finder from "../Finder/Finder"

import FinderEditor from "../Finder/FinderEditor"

import MediaEditor from "../Finder/MediaEditor"
import DocumentEditor from "../Finder/DocumentEditor"
import DocumentPreview from "../Finder/DocumentPreview"
import DocumentLinks from "../Finder/DocumentLinks"

import CollectionEditor from "../Finder/CollectionEditor"


const AdminRoutes = (props) => {


    return (
        <Switch>
            <Route path="/:root*/collections/:parents*/:uniqueId/edit" component={ CollectionEditor } />
            <Route path="/:root*/media/:parents*/:uniqueId/edit" component={ MediaEditor } />
            <Route path="/:root*/documents/:parents*/:uniqueId/edit" component={ DocumentEditor } />

            <Route path="/:root*/:parents*/new" component={ FinderEditor } />
            <Route path="/:root*/:parents*/:uniqueId/edit" component={ FinderEditor } />
            <Route path="/:root*/:parents*/:uniqueId/view" component={ DocumentPreview } />
            <Route path="/:root*/:parents*/:uniqueId/link" component={ DocumentLinks } />
            <Route path="/:root*/:parents*" component={ Finder } />
            <Route path="/:root*" component={ Finder } />
        </Switch>
      )

}

export default AdminRoutes