import React from 'react';
import { ViewBase, ViewHeader, MasonryView, MasonryModule } from "../components/KpView"

const BulkPreviewMasonry = ({title, items = []}) => {

    return (
        <ViewBase>
            <ViewHeader title={title} />
            <MasonryView colSize={200} >
                { items && items.map((model, index) => {
                    return (
                        <MasonryModule {...model} key={index} />
                    )
                })}
            </MasonryView>
        </ViewBase>
    )

}

export default BulkPreviewMasonry