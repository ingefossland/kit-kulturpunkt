import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import SearchDialog from "./SearchDialog.example"
import MediaDialog from "./MediaDialog.example"
import DocumentsDialog from "./DocumentsDialog.example"
import UploadDialog from "./UploadDialog.example"
import FavouritesDialog from "./FavouritesDialog.example"

const DialogRoutes = (props) => {

    return (
        <Switch>
            <Route path="/:appName/reference/mix" render={ () => <DocumentsDialog query={{models: "documents", documentType: ["article","page","ekultur"]}} /> } />
            <Route path="/:appName/reference/article" render={ () => <DocumentsDialog query={{models: "documents", documentType: "article"}} /> } />
            <Route path="/:appName/reference" render={ () => <DocumentsDialog query={{models: "documents"}} /> } />
            <Route path="/:appName/media/mix" render={ () => <MediaDialog query={{models: "media", mediaType: ["image","video","audio","vimeo","youtube","sketchfab"]}} /> } />
            <Route path="/:appName/media/image" render={ () => <MediaDialog query={{models: "media", mediaType: "image"}} /> } />
            <Route path="/:appName/media/video" render={ () => <MediaDialog query={{models: "media", mediaType: ["video","youtube","vimeo","ekultur"]}} /> } />
            <Route path="/:appName/media/sketchfab" render={ () => <MediaDialog query={{models: "media", mediaType: "sketchfab"}} /> } />
            <Route path="/:appName/media/upload" render={ () => <MediaDialog query={{models: "media"}} /> } />
            <Route path="/:appName/media" render={ () => <MediaDialog query={{models: "media"}} /> } />
            <Route path="/:appName/favourites" render={ () => <FavouritesDialog query={{models: "media"}} /> } />
            <Route path="/:appName/upload" render={ () => <UploadDialog query={{models: "media"}} /> } />
            <Route path="/:appName/ekultur" render={ () => <SearchDialog query={{models: "ekultur"}} /> } />
            <Route path="/:appName/schemas" render={ () => <SearchDialog query={{models: "schemas"}} /> } />
            <Route path="/:appName" component={ SearchDialog } />
        </Switch>        
    )

}

export default DialogRoutes