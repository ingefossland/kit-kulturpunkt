import React, { Component } from 'react';
import { Switch, Route } from "react-router-dom"

import { LayoutAdmin, FinderLayout } from '../';
import { getMenuByUrl, getParents, getResultsById, getInboxMenu, filterInboxResults } from "../../resources/functions/"

class ExampleFinderApp extends Component {
  
    static defaultProps = {
        app: undefined,
        user: undefined,
        owner: undefined,
        data: undefined
    }
    
    state = {
        root: undefined,
        pathname: undefined,
        moduleSize: "large",
        menu: [],
        menuByUrl: {},
        parents: [],
        results: [],
        resultsById: {},
        uniqueId: undefined,
        item: undefined
    }
    
    componentDidMount() {
        this.getApp()
        this.getData()
    }

    componentDidUpdate = (prevProps, prevState) => {

        if (prevProps.app !== this.props.app) {
            this.getApp()
        }

        if (prevProps.data !== this.props.data) {
            this.getData()
        } 

        if (prevProps.location.pathname !== this.props.location.pathname) {
            this.getPathname()
        } 

        if (prevState.uniqueId !== this.state.uniqueId) {
            this.getItem()
        } 

        if (prevState.results !== this.state.results) {
            this.getCategories()
        } 
    
    }
    
    getItem = () => {
        const { uniqueId, resultsById } = this.state;
        
        let item;
        
        if (uniqueId && resultsById[uniqueId]) {
            item = resultsById[uniqueId]
        }

        this.setState({
            item: item || undefined
        })
        
    }
    
    getData = () => {
        const { data } = this.props;
        
        const results = data.models || []
        const resultsById = getResultsById(results)
        
        this.setState({
            results: results,
            resultsById: resultsById
        })
        
    }
    
    getCategories = () => {
        const { root, results } = this.state;
        
        const menu = getInboxMenu(root, results);
        
        this.setState({
            menu: menu,
        })
        
    }

    getApp = () => {
        const app = this.props.app;
        const layout = this.props.layout || this.props.app.layout || undefined
        const root = this.props.root || this.props.app.root || undefined;
        const menu = this.props.menu || this.props.app.menu || [];
        
        let menuByUrl, parents;
        
        if (menu) {
            menuByUrl = getMenuByUrl(root, menu)
            parents = getParents(menuByUrl, root)
        }

        this.setState({
            root: root,
            pathname: root,
            app: app,
            layout: layout,
            menu: menu,
            menuByUrl: menuByUrl,
            parents: parents,
            urlPattern: root + "/section/category/:uniqueId",
        })

    }
    
    getPathname = () => {
        const { root, menuByUrl, results } = this.state;
        const { pathname } = this.props.location;

        const parents = getParents(menuByUrl, pathname)
        
        const url = pathname.slice(root.length);
        const urls = url.split('/');
        
        const section = urls[1] || undefined
        const category = urls[2] || undefined
        const uniqueId = urls[3] || undefined
        
        let resultsByCategory;
        
        if (section) {
            resultsByCategory = filterInboxResults(results, section, category)
        }
        
        this.setState({
            pathname: pathname,
            parents: parents,
            uniqueId: uniqueId,
            section: section,
            category: category,
            resultsByCategory: resultsByCategory
        })
        
    }
    
    render() {
        const { results, resultsByCategory } = this.state;
        
        return (
            <LayoutAdmin {...this.props} {...this.state}>
                <FinderLayout {...this.state}>
                    <LayoutModels models={resultsByCategory || results} />
                </FinderLayout>
            </LayoutAdmin>
    
        )
    
    }

}

export default ExampleFinderApp;

