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

const ColumnView = ({layout = "list", resultsLoaded, onPage, ...props})  => {

    const menuItem = {}

    const _onEdit = ({url}) => {
        const editUrl = url + "/edit"
        editUrl && props.history.push(editUrl)
    }

    const _onSelect = ({url}) => {
        url && props.history.push(url)
    }

    const _onCreateChild = ({url, id}) => {
        const parentId = Number.isInteger(id) && id || null
        const createUrl = url && url + "/new?" + qs.stringify({documentType: "pageTopic", parentId: parentId})
        createUrl && props.history.push(createUrl)
    }

    return (
            <DocumentTree>
                <DocumentTreeColumn>

                        {resultsLoaded && resultsLoaded.map((model, index) => {

                            return (
                                <DocumentTreeModule {...model} layout="list" {...props} key={index} />
                            )

                        })}

                    })}
                </DocumentTreeColumn>
                <DocumentTreeColumn>
                    <FinderPreview model={menuItem} />
                </DocumentTreeColumn>
            </DocumentTree>
    )



}

ColumnView.defaultProps = {
}

export default ColumnView