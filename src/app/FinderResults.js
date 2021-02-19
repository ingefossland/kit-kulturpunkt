import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { bulkAdd, bulkRemove, bulkToggle, bulkReset } from '../redux/bulk';
import { getPreview, getEditor, collapseEditor } from '../redux/finder';

import { getModel, getArtifact, deleteModel, restoreModel, eraseModel, selectModel } from '../redux/modelsById';
import qs from 'query-string';

import { ViewBase, ViewHeader, ViewLoader, EmptyView } from "../components/PrimusView"

import FinderView from "./FinderView"

const FinderResults = (props) => {
    const { query, isLoading, count, resultsLoaded } = props;

    const { t, i18n } = useTranslation('finder');

    const location = useLocation()
    const history = useHistory()
    const dispatch = useDispatch()

    const sq = location.search && qs.parse(location.search)

    // onSelect

    const _onSelect = ({url}) => {
        url && history.push(url)
    }

    // sortOptions

    const _onSort = (sort) => {
        const sq = location.search && qs.parse(location.search)
        const url = location.pathname + "?" + qs.stringify({...sq, sort: sort});
        history.replace(url)
    }

    const sortOptions = ["title", "title DESC", "createdAt DESC", "updatedAt DESC"]
    const sort = sq.sort || sortOptions && sortOptions[0]

    // rowsOptions

    const _onRows = (rows) => {
        const sq = location.search && qs.parse(location.search)
        const url = location.pathname + "?" + qs.stringify({...sq, rows: rows});
        history.replace(url)
    }

    const rowsOptions = [10,20,30,40,50]
    const rows = sq.rows || rowsOptions[0]

    // viewOptions

    const _onView = (view) => {
        const url = location.pathname + "?" + qs.stringify({...sq, view: view});
        history.replace(url)
    }

    const viewOptions = ["list","icons","table","gallery","masonry"]
    const view = sq.view || viewOptions[0]

    // sizeOptions

    const _onSize = (size) => {
        const url = location.pathname + "?" + qs.stringify({...sq, size: size});
        history.replace(url)
    }

    const sizeOptions = ["xs","sm","md","lg","xl"]
    const size = sq.size || "md"

    // parents, title, etc

    const finder = useSelector(state => state.finder)
    const bulk = useSelector(state => state.bulk)

    const selected = bulk.count

    // format numbers

    const selectedFormatted = new Intl.NumberFormat('de-DE').format(selected)
    const countFormatted = new Intl.NumberFormat('de-DE').format(count)

    // select

    const _onSelectAll = () => {

        resultsLoaded.map(item => {
            const { source, sourceId } = item;
            const uniqueId = item.uniqueId || source + "/" + sourceId
            dispatch(bulkAdd({uniqueId}))
        })

    }

    const _onSelectToggle = () => {

        resultsLoaded.map(item => {
            const { source, sourceId } = item;
            const uniqueId = item.uniqueId || source + "/" + sourceId
            dispatch(bulkToggle({uniqueId}))
        })

    }

    const _onSelectNone = () => {
        dispatch(bulkReset())
    }

    // bulk

    const _onBulkEdit = () => {
        dispatch(getEditor({
            "expanded": true,
            "title": t('Edit selected'),
            "model": "editor"
        }))
        
    }

    const _onCreateReport = () => {
        dispatch(getEditor({
            "expanded": true,
            "title": t('Create report'),
            "model": "report"
        }))
        
    }

    // options

    let options = []

    if (selected) {

        const selectOptions = [
            {
                "title": t('Select all'),
                "onClick": _onSelectAll,
            },
            {
                "title": t('Unselect all'),
                "onClick": _onSelectNone
            },
            {
                "title": t('Toggle selected'),
                "onClick": _onSelectToggle
            },
        ]

        const exportOptions = [
            {
                "title": t('Export to {{format}}', {format: "PDF"})
            },
            {
                "title": t('Export to {{format}}', {format: "Excel"})
            }
        ]

        const bulkOptions = [
            {

                "icon": "edit",
                "title": t('Edit selected'),
                "onClick": _onBulkEdit
            },
            {
                "icon": "trending_up",
                "title": t('Create report'),
                "onClick": _onCreateReport
            },
            {
                children: exportOptions
            }
        ]

        options = [
            {
                "title": t("Select"),
                "children": selectOptions
            },
            {
                "title": t("Action"),
                "children": bulkOptions
            }
        ]

    }

    // parents

    let parents = finder.parents

    // title

    let title

    if (query && query.q) {
        parents = [
            ...parents,
            {
                title: "«" + query.q + "»"
            }
        ]
    }

    // description

    let description

    if (isLoading) {
        description = t('Loading') + "..."
    } else if (selected) {
        parents = undefined
        title = t('{{selected}} of {{count}} selected', { selected: selectedFormatted, count: countFormatted });
    } else if (!isLoading && count) {
        description = t('{{count}} hits', { count: countFormatted });
    } else {
        description = t('No hits');
    }

    if (!isLoading && !count) {
        return (
            <ViewBase>
                <ViewHeader description={description} parents={parents} onSelect={_onSelect} />
                <EmptyView />
            </ViewBase>
        )

    }


    return (
        <ViewBase>
            <ViewHeader {...props} 
                parents={parents}
                title={title} 
                description={description}

                view={view}
                viewOptions={!selected && viewOptions}
                onView={_onView} 

                rows={rows}
                rowsOptions={!selected && rowsOptions}
                onRows={_onRows} 

                sort={sort}
                sortOptions={!selected && sortOptions}
                onSort={_onSort} 

                size={size}
                sizeOptions={!selected && sizeOptions}
                onSize={_onSize} 

                options={options}
                onSelect={_onSelect} />
            <ViewLoader isLoading={isLoading}>
                <FinderView view={view} size={size} />
            </ViewLoader>
        </ViewBase>
    )


}

FinderResults.defaultProps = {
}

export default FinderResults