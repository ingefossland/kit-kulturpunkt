import React from "react"
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
} from "."

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

const KpView = ({view = "list", items,}) => {

    const Template = templates && templates[view]
    const Module = modules && modules[view]

    const Icon = ({documentType, mediaType}) => {
        return documentType && icons[documentType]
    }

    return (
        <ViewBase>
            <ViewHeader title={view} />
            <Template>
                {items && items.map((item, index) => <Module {...item} icon={<Icon {...item} />} key={index} />)}
            </Template>
        </ViewBase>

    )

}

export default KpView;