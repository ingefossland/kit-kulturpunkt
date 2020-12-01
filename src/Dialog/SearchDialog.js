import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { getQuery } from '../redux/searchByUrl';

import DialogBase from "./DialogBase"
import DialogSearch from "./DialogSearch"

import DialogHeader from "./DialogHeader"
import DialogSection from "./DialogSection"

import SearchResults from "./SearchResults"

import qs from 'query-string';
import _ from "lodash"

const SearchDialog = ({schema, formData, onChange, onClose, query = {}, ...props}) => {
    const { t, i18n } = useTranslation(['dialog']);
    const dispatch = useDispatch()

    const searchByUrl = useSelector(state => state.searchByUrl)

    console.log('query', query)

    // user query

    const [userQ, setUserQ] = useState("")

    const handleQuery = _.debounce((q, event) => {
        setUserQ(q)
    }, 500)

    const handleReset = () => {
        if (q) {
            setUserQ("")
        } else if (onClose) {
            onClose()
        }
    }

    // set q

    let q

    if (query.q && userQ) {
        q = query.q + " " + userQ.trim() + "*";
    } else if (userQ) {
        q = userQ.trim() + "*"
    } else if (query.q) {
        q = query.q
    }

    // sort

    const sortOptions = [
        "updatedAt DESC",
        "title", 
    ]

    const [sort, setSort] = useState(sortOptions[0])

    const sortSettings =  {
        "name": "sort",
        "value": sort,
        "onChange": (name, value) => setSort(value),
        "options": sortOptions.map(value => {
            return {
                label: t("sort:"+value || value),
                value: value
            }
        })
    }

    // base query

    query = {
        ...query,
        url: "/dialog/search",
        start: 0,
        rows: 20,
        sort: sort,
        status: "NOT trash",
        fl: "uniqueId,source,sourceId,documentType,mediaType,imageUrl,title,description,status,mediaWidth,mediaHeight,updatedAt,updatedByName",
        q: q,
    }

    // dm

    const dmOwnerOptions = [
        "*",
        "AHS",
        "NF", 
    ]

    const [dmOwner, setDmOwner] = useState(dmOwnerOptions[0])

    const dmOwnerSettings =  {
        "name": "dmOwner",
        "value": dmOwner,
        "onChange": (name, value) => setDmOwner(value),
        "options": dmOwnerOptions.map(value => {
            return {
                label: "owner:" + value,
                value: value
            }
        })
    }


    const getMediaSource = (source) => {
        const queryUrl = query.url + "/" + source + "/" + query.q

        return {
            title: "media/" + source,
            layout: "gallery",
            query: {
                url: queryUrl,
                models: source,
                siteId: query.siteId,
                collectionId: query.collectionId,
                rows: query.rows,
                q: query.q
            }
        }

    }

    const getMediaType = (mediaType) => {
        const queryUrl = query.url + "/" + mediaType + "/" + query.q

        return {
            title: "media/" + mediaType,
            layout: mediaType.includes("audio") && "list" || "gallery",
            settings: [
                sortSettings
            ],
            query: {
                ...query,
                url: queryUrl,
                mediaType: mediaType
            }
        }

    }

    const getMediaSections = () => {

        let mediaTypes = []

        if (Array.isArray(query.mediaType)) {
            mediaTypes = query.mediaType
        } else if (query.mediaType) {
            mediaTypes = [query.mediaType]
        } else if (query.models === "media") {
            mediaTypes = ['image*','video*','audio*']
        }

        return mediaTypes && mediaTypes.map(mediaType => {
            if (mediaType === "youtube" || mediaType == "vimeo" || mediaType === "sketchfab") {
                return getMediaSource(mediaType)
            } else {
                return getMediaType(mediaType)
            }
        })

    }

    // get documentSections

    const getDocumentSource = (source) => {
        return {
            title: "documents/" + source,
            layout: "list",
            settings: [
                dmOwnerSettings
            ],
            query: {
                models: source,
                url: query.url + "/" + source + "/" + query.q,
                owner: dmOwner,
                siteId: query.siteId,
                collectionId: query.collectionId,
                rows: query.rows,
                q: query.q
            }
        }
        
    }    

    const getDocumentType = (documentType) => {
        return {
            title: "documents/" + documentType,
            layout: "list",
            settings: [
                sortSettings
            ],
            query: {
                ...query,
                url: query.url + "/" + documentType + "/" + query.q,
                documentType: documentType
            }
        }
    }

    const getDocumentSections = () => {
        let documentTypes = []

        if (Array.isArray(query.documentType)) {
            documentTypes = query.documentType
        } else if (query.documentType) {
            documentTypes = [query.documentType]
        } else if (query.models === "documents") {
            documentTypes = ['*']
        }

        return documentTypes && documentTypes.map(documentType => {
            if (documentType === "ekultur") {
                return getDocumentSource(documentType)
            } else {
                return getDocumentType(documentType)
            }
        })   

    }


    let sections = []

    if (query.models === "media") {
        sections = getMediaSections()
    } else if (query.models === "documents") {
        sections = getDocumentSections()
    } else if (query.models === "ekultur") {
        sections = [getDocumentSource("ekultur")]
    } else if (query.models) {
        sections = [
            {
                title: query.models,
                query: {
                    ...query,
                    models: query.models,
                    url: query.url + "/" + query.models + "/" + query.q,
                }
            }
        ]
    }
    // get tabs

    const [tabIndex, setTabIndex] = useState(0)
    const currentTab = sections[tabIndex]

    // get search count

    const getSearchCount = () => {
        sections.map((section, index) => {
            const { query } = section;

            if (query.models === "media" && tabIndex !== index) {
                dispatch(getQuery({...query, rows: 0}))
            }

            if (query.models === "documents" && tabIndex !== index) {
                dispatch(getQuery({...query, rows: 0}))
            }

        })
        
    }

    // setup tabs

    const handleTab = (index) => {
        setTabIndex(index)
    }

    const tabs = sections.map((section, index) => {
        const { title, query } = section;

        const currentSearch = searchByUrl && searchByUrl[query.url]
        const resultsLoaded = currentSearch && currentSearch.resultsLoaded
        
        let count;

        if (section.layout === "uploads") {
            count = section.count
        } else if (currentSearch && currentSearch.count) {
            count = currentSearch && currentSearch.count
        } else if (resultsLoaded && resultsLoaded.length && currentSearch.nextToken) {
            count = resultsLoaded && resultsLoaded.length && resultsLoaded.length + "+";
        } else if (resultsLoaded && resultsLoaded.length) {
            count = resultsLoaded && resultsLoaded.length && resultsLoaded.length;
        }

        return {
            title: t(title),
            count: count,
            onClick: () => handleTab(index)
        }

    })

    const getSearch = () => {
        currentTab && currentTab.query && dispatch(getQuery(currentTab.query))
    }

    useEffect(() => {
        getSearch()
    }, [tabIndex, query.q, query.sort, dmOwner])

    // current query and search 

    const currentQuery = currentTab && currentTab.query
    const currentSearch = currentQuery.url && searchByUrl && searchByUrl[currentQuery.url];

    useEffect(() => {
        getSearchCount()
    }, [query.q])

    // handle page

    const handlePage = (page) => {
        dispatch(getQuery({
            ...currentQuery,
            page: page,
            start: currentQuery.rows * (page-1),
            nextToken: currentSearch && currentSearch.nextToken
        }))
    }

    // pages
    
    const [pages, setPages] = useState(0)
    const [currentPage, setCurrentPage] = useState(0)
    const [nextPage, setNextPage] = useState(0)

    const getPages = () => {
        const pages = Math.ceil(currentSearch.count/currentSearch.rows)
        const page = Math.ceil((currentSearch.start+currentSearch.rows)/currentSearch.rows)

        setPages(pages)
        setCurrentPage(page)

        let nextPage = 0

        for (let p = page; p <= pages; p++) {
            if (!currentSearch.resultsByPage[p]) {
                nextPage = p
                break
            }
        }    

        setNextPage(nextPage)
    
    }

    useEffect(() => {
        currentSearch && currentSearch.count && getPages()
    }, [currentSearch])

    // search

    let search = {
        placeholder: "Search"
    }

    if (!search.placeholder) {

        if (tabs.length === 1 && currentQuery.models === "media" && currentQuery.mediaType) {
            search.placeholder = t("Search media/" + currentQuery.mediaType)
        } else if (tabs.length === 1 && currentQuery.models === "ekultur" ) {
            search.placeholder = t("Search ekultur")
        } else if (query.models === "media") {
            search.placeholder = t("Search media")
        } else if (query.models === "documents") {
            search.placeholder = t("Search documents")
        } else {
            search.placeholder = t("Search models")
        }

    }

    return (
        <DialogBase>
            <DialogSection>
                <DialogSearch 
                    {...search} 
                    expanded={true}
                    onChange={handleQuery}
                    onReset={handleReset} />
                <DialogHeader 
                    tabs={tabs}
                    tabIndex={tabIndex}
                    settings={currentTab && currentTab.settings} />
                <SearchResults 
                    schema={schema}
                    formData={formData}
                    onChange={onChange}
                    query={currentQuery}
                    layout={currentTab && currentTab.layout}
                    search={currentSearch}
                    results={{
                        ...currentSearch,
                        pages: pages,
                        page: currentPage,
                        nextPage: nextPage
                    }}
                    onPage={handlePage}                    
                    />
            </DialogSection>
        </DialogBase>        
    )

}


export default SearchDialog