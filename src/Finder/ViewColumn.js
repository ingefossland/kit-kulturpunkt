import React, { useEffect, useState } from 'react';

import {
    ColumnView,
    ColumnList,
    ColumnModule,
} from "../components/"

import FinderPreview from "./FinderPreview"
import FinderModel from "./FinderModel"

const ViewColumn = ({layout = "list", resultsLoaded, onPage, ...props})  => {

    const _onEdit = () => {
        alert("edit")
    }

    return (
        <ColumnView>
            <ColumnList>

                    {resultsLoaded && resultsLoaded.map((model, index) => {
                        return (
                            <FinderModel model={model} onEdit={_onEdit}>
                                <ColumnModule  />
                            </FinderModel>
                        )
                    })}

            </ColumnList>
            <ColumnList>
                <FinderPreview model={{title: "Untitled"}} />
            </ColumnList>
        </ColumnView>
    )

}

ViewColumn.defaultProps = {
}

export default ViewColumn