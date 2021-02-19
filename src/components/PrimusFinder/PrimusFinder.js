import React, { useRef, useEffect, useState } from "react"
import AppLayout from "../App/AppLayout"

import { FinderBase, FinderSidebar, FinderSection } from "../Finder"

import PrimusSidebar from "./PrimusSidebar"
import PrimusView from "./PrimusView"
import PreviewMatrix from "../PrimusPreview/PreviewGrid"
import FinderEditor from "./FinderEditor"
import NavFilters from "./NavFilters"



const PrimusFinder = ({count, rows, models = []}) => {

    const [items, setItems] = useState([])
    const [query, setQuery] = useState({})

    const _onFilter = ({name, value}) => {

        if (!query[name]) {

            setQuery({
                ...query,
                [name]: value
            })

        } else {
 
            setQuery({
                ...query,
                [name]: undefined
            })
            
    
        }

    }

    useEffect(() => {

        const items = models.map(item => {
            
            const t = item.title && item.title.split("[") || []
            const title = t[0] && t[0].trim()

            const d = t[1] && t[1].replace("]","").trim()

            const m = d && d.split('-')

            const designation = m && m[0].trim("")

            const artist = item.content && item.content.producer

            return {
                ...item,
                uniqueId: item.sourceId,
                title: title,
                designation: designation,
                label: designation,
                artist: artist
            }

        })

        const filteredItems = items.filter(item => {

            let hit = true

            if (query) {

                Object.keys(query).map(name => {
                    if (query[name] && item[name] !== query[name]) {
                        hit = false
                    }
                })

            }

            return hit


        })

        setItems(filteredItems) 

    }, [models, query])

    const [filters, setFilters] = useState([])

    useEffect(() => {

        const keys = [
            "designation",
            "artist"
        ]

        let facets = {}

        items.map((item, index) => {

            Object.keys(item).filter(key => keys.includes(key)).map(key => {

                if (!facets[key]) { 
                    facets[key] = {}
                }

                const value = item[key]

                if (!facets[key][value]) {
                    facets[key][value] = 1
                } else {
                    facets[key][value]++
                }

            })

        })

        const filters = Object.keys(facets).map(name => {
            return {
                name: name,
                facets: Object.keys(facets[name]).map(value => {
                    return {
                        value: value,
                        count: facets[name][value]
                    }
                })
            }
        })

        
        setFilters(filters)

    }, [items])

    const _onSelect = ({uniqueId, selected}) => {

        const results = items.map((item, index) => {

            if (item.uniqueId === uniqueId) {
                item.selected = !selected
                item.expanded = true
            } else {
                item.expanded = false
            }

            return item

        })

        setItems(results)

    }

    const _onSelectAll = () => {

        const results = items.map((item, index) => {

            return {
                ...item,
                selected: true
            }

        })

        setItems(results)

    }

    const _onUnselectAll = () => {

        const results = items.map((item, index) => {

            return {
                ...item,
                selected: false
            }

        })

        setItems(results)

    }

    const _onSelectToggle = () => {

        const results = items.map((item, index) => {

            return {
                ...item,
                selected: !item.selected
            }

        })

        setItems(results)

    }

    const itemsSelected = items.filter(item => item.selected)


    const [bulkItems, setBulkItems] = useState([])

    const _onBulkEdit = () => {
        setBulkItems(itemsSelected)
    }

    const _onBulkCancel = () => {
        setBulkItems([])
    }

    const _onCreateReport = () => {


    }

    // preview

 

    const preview = {
        items: itemsSelected,
        expanded: itemsSelected.length && true
    }

    const previewSubview = preview.expanded && {
        expanded: true,
        title: "Preview",
        description: itemsSelected.length + " objekter",
        onToggle: _onUnselectAll
    }

    const action = {
        expanded: bulkItems.length && true,
    }

    const actionSubview = action.expanded && {
        expanded: true,
        title: "Action",
        description: itemsSelected.length,
        onToggle: _onBulkCancel
    }


    const editor = {
        count: items.length,
        selected: itemsSelected.length,
        onCancel: _onBulkCancel,

    }

    const [scrollTop, setScrollTop] = useState(0)
 
    const _onScroll = (element) => {
        console.log(element.scrollTop)
        setScrollTop(element.scrollTop)
    }

    const viewOptions = ["list","grid","gallery"]
    const [view, setView] = useState(viewOptions[0])

    const _onViewChange = (view) => {
        setView(view)
    }

    const section = {
        viewOptions: viewOptions,
        view: view,
        onViewChange: _onViewChange,
        items: items,
        count: count,
        selected: itemsSelected.length,
        scrollTop: scrollTop,
        onScroll: _onScroll,
        onSelect: _onSelect,
        onSelectAll: _onSelectAll,
        onSelectToggle: _onSelectToggle,
        onUnselectAll: _onUnselectAll,
        onBulkEdit: _onBulkEdit,
        onCreateReport: _onCreateReport,

    }
    
    const [searchExpanded, setSearchExpanded] = useState(false)

    const search = {
        expanded: searchExpanded,
        placeholder: "Søk i Primus art",
        onReset: () => setSearchExpanded(expanded => !expanded),
        onToggle:  () => setSearchExpanded(expanded => !expanded)
    }

    const [sidebarExpanded, setSidebarExpanded] = useState(true)

    const sidebar = {
        collapsible: true,
        expanded: !preview.expanded && sidebarExpanded,
        onToggle: () => setSidebarExpanded(expanded => !expanded),
        filters: filters,
        onFilter: _onFilter
    }

    const content = {
        expanded: !action.expanded,
    }

    const subview = actionSubview || previewSubview || {}

    const header = {
        title: "Primus art",
        sidebar: sidebar,
        subview: subview,
        search: search
    }

    const theme = {
        palette: {
            primary: {
                main: "#f00"
            }
        }
    }

    return (
        <AppLayout
            theme={theme}
            header={header}>
            <FinderBase>
                <FinderSidebar {...sidebar}>
                    <PrimusSidebar {...sidebar} />
                </FinderSidebar>
                <FinderSection {...content}>
                    <PrimusView {...section} />
                </FinderSection>
                <FinderSection {...preview}>
                    <PreviewMatrix {...preview} />
                </FinderSection>
                <FinderSection {...action}>
                    <FinderEditor {...editor} />
                </FinderSection>
            </FinderBase>
        </AppLayout>
    )

}

export default PrimusFinder;