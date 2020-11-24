import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { sortMenuTree, moveMenuItem } from '../redux/finder';
import qs from 'query-string';

import {
    DocumentTree,
    DocumentTreeColumn,
    DocumentTreeModule,
} from "../components/DocumentTree/"

import FinderPreview from "./FinderPreview"
import FinderModel from "./FinderModel"

import { ListViewList, ListViewHeader, ListViewFooter, ListViewItem } from "../components"


const ColumnView = ({layout = "list", resultsLoaded, onPage, ...props})  => {

    const _onEdit = () => {
        alert("edit")
    }

    return (
        <DocumentTree>
            <DocumentTreeColumn>

                <ListViewList>

                    {resultsLoaded && resultsLoaded.map((model, index) => {
                        return (
                            <FinderModel model={model} onEdit={_onEdit}>
                                <ListViewItem  />
                            </FinderModel>
                        )
                    })}

                </ListViewList>

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