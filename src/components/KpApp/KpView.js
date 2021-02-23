import React, { useState } from "react"
import { 
    ViewBase,
    ViewHeader,
    ViewLoader,
    ViewPages,
    EmptyView,

    ListView,
    ListModule,

    IconsView,
    IconsModule,

    GridView,
    GridModule,

    TableView,
    TableModule,
    
    GalleryView,
    GalleryModule,

    MasonryView,
    MasonryModule,    
} from "../"

import KpColumnView from "../ColumnView/ColumnView.example"
import KpTreeView from "../TreeView/TreeView.example"

import icons from "../KpIcons"

const templates = {
    "list": ListView,
    "icons": IconsView,
    "table": TableView,
    "gallery": GalleryView,
    "masonry": MasonryView,
    "grid": GridView,
}

const modules = {
    "list": ListModule,
    "icons": IconsModule,
    "table": TableModule,
    "gallery": GalleryModule,
    "masonry": MasonryModule,
    "grid": GridModule,
}

const KpView = ({viewOptions, view = "list", onView, items, parents, title}) => {

    const Template = templates && templates[view]
    const Module = modules && modules[view]

    const _getIcon = ({documentType, mediaType}) => {
        return documentType && icons[documentType]
    }

    if (!title) {
        title = view
    }

    if (view === "tree") {

        return (
            <ViewBase>
                <ViewHeader parents={parents} title={title} viewOptions={viewOptions} view={view} onView={onView} />
                <KpTreeView sortable={true} icons={icons} items={items} />
            </ViewBase>
        )
    }

    if (view === "cols") {

        return (
            <ViewBase>
                <ViewHeader parents={parents} title={title} viewOptions={viewOptions} view={view} onView={onView}  />
                <KpColumnView sortable={true} icons={icons} items={items} />
            </ViewBase>
        )
    }



    return (
        <ViewBase>
            <ViewHeader parents={parents} title={title} viewOptions={viewOptions} view={view} onView={onView}  />
            <Template>
                {items && items.map((item, index) => <Module {...item} selectable={true} editable={true} deletable={true} icon={_getIcon(item)} key={index} />)}
            </Template>
        </ViewBase>

    )

}

export default KpView;