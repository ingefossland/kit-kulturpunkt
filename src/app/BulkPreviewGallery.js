import React from 'react';
import { ViewBase, ViewHeader, GalleryView, GalleryModule } from "../components/PrimusView"

const BulkPreviewGallery = ({title, items = []}) => {

    return (
        <ViewBase>
            <ViewHeader title={title} />
            <GalleryView mediaSize={200}>
                { items && items.map((model, index) => {
                    return (
                        <GalleryModule {...model} key={index} />
                    )
                })}
            </GalleryView>
        </ViewBase>
    )

}

export default BulkPreviewGallery