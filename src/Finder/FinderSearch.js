import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getView, getSort } from '../redux/finder';
import { getQuery } from '../redux/searchByUrl';
import qs from 'query-string';

import Bulk from "./Bulk"
import FinderQuery from "./FinderQuery"
import FinderLayout from "./FinderLayout"
import View from "./View"

const FinderSearch = ({finder = {}, parent = {}, ...props}) => {

    const dispatch = useDispatch()

    const sq = props.location.search && qs.parse(props.location.search) || {}

    const _onSelect = ({url}) => {
        url && props.history.push(url)
    }

    const _onView = (view) => {
        const sq = props.location.search && qs.parse(props.location.search)
        const url = props.location.pathname + "?" + qs.stringify({...sq, view: view});
        props.history.replace(url)
    }

    const { url, sections, query, viewOptions, sortOptions } = parent

    const view = sq.view || props.view || viewOptions && viewOptions[0] || "list"

    // groups

    if (sections) {

        const menuByUrl = finder && finder.menuByUrl

        let groups = []

        sections.map(section => {

            const { url } = section

            const parent = menuByUrl[url] || {}
            
            groups.push({
                ...parent,
                ...section,
            })
        })

        return (
            <Bulk>
                <FinderLayout>
                    {groups && groups.map((group, index) => {

                        const { url, query, viewOptions, sortOptions, view } = group

                        if (query) {
                            return (
                                <FinderQuery url={url} query={query} view={view} title={group.title} {...props} />                                
                            )
                            
                        }


                    })}
                </FinderLayout>
            </Bulk>
        )

    }

    return (
        <Bulk>
            <FinderLayout {...finder} {...sq} onSelect={_onSelect} view={view} viewOptions={viewOptions} onView={_onView}>
                { query && <FinderQuery url={url} query={query} sortOptions={sortOptions} viewOptions={viewOptions} {...props} /> }
            </FinderLayout>
        </Bulk>
    )

}

FinderSearch.defaultProps = {
}

export default FinderSearch