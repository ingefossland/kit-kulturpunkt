import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { sortMenuTree, moveMenuItem } from '../redux/finder';
import qs from 'query-string';

import {
    DocumentTree,
    DocumentTreeColumn,
    DocumentTreeModule,
} from "../components/DocumentTree"

import FinderPreview from "./FinderPreview"
import FinderModel from "./FinderModel"

import { ListModule } from "../components"


const ColumnView = ({layout = "list", resultsLoaded, onPage, ...props})  => {

    const _onEdit = () => {
        alert("edit")
    }

    return (
        <DocumentTree>
            <DocumentTreeColumn>

                    {resultsLoaded && resultsLoaded.map((model, index) => {
                        return (
                            <FinderModel model={model} onEdit={_onEdit}>
                                <ListModule  />
                            </FinderModel>
                        )
                    })}

            </DocumentTreeColumn>
            <DocumentTreeColumn>
                <FinderPreview model={{title: "Untitled"}} />
            </DocumentTreeColumn>
        </DocumentTree>
    )

}

ColumnView.defaultProps = {
}

export default ColumnView