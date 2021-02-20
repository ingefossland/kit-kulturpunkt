import React from 'react';
import { ViewBase, ViewHeader, ListView, ListModule } from "../components/KpView"

const BulkPreviewList = ({title, viewAction, items = []}) => {

    return (
        <ViewBase>
            <ViewHeader title={title} viewAction={viewAction} />
            <ListView paddingX={2}>
                { items && items.map((model, index) => {
                    return (
                        <ListModule {...model} key={index} />
                    )
                })}
            </ListView>
        </ViewBase>
    )

}

export default BulkPreviewList