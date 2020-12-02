import React, { Component } from 'react';
import { ButtonTertiary } from "../"

import "./FinderTabs.scss"

class FinderTabs extends Component {

    static defaultProps = {
        tabIndex: 0,
        tabId: undefined
    };
  
    state = {
        index: 0,
        tabs: [],
        tabpanels: []
    }
    
    componentDidMount() {
        this.getTabs()
    }
    
    componentDidUpdate = (prevProps) => {
        
        if (prevProps.tabIndex !== this.props.tabIndex) {
            this.getTabs()
        }

        if (prevProps.tabId !== this.props.tabId) {
            this.getTabs()
        }

        if (prevProps.children !== this.props.children) {
            this.getTabs()
        }
        
    }
    
    getTabpanel = (child, index) => {
        const { id, url, title, children } = child.props;

        const tabpanelId = id || "admin-tabs-" + index;
        const tabId = tabpanelId + "-tab";
        
        return {
            index: index,
            id: tabpanelId,
            labelledby: tabId,
            children: children
        }
        
    }
    
    getTab = (child, index) => {
        const { id, url, title, children } = child.props;

        const tabpanelId = id || "admin-tabs-" + index;
        const tabId = tabpanelId + "-tab";
        
        return {
            index: index,
            url: url,
            id: tabId,
            controls: tabpanelId,
            title: title
        }
        
    }
    
    getTabs = () => {
        const { tabIndex, tabId } = this.props;
        
        if (!this.props.children) {
            return false
        }

        const tabs = React.Children.toArray(this.props.children).map(this.getTab)
        const tabpanels = React.Children.toArray(this.props.children).map(this.getTabpanel)
        
        let tabsById = {}
        
        tabpanels.map(tab => {
            tabsById[tab.id] = tab;
        })
        
        if (!tabsById) {
            return false
        }
        
        // set index by tabId or tabIndex
        
        const index = tabId && tabsById && tabsById[tabId] && tabsById[tabId].index || tabIndex;
        
        this.setState({
            index: index,
            tabs: tabs,
            tabpanels: tabpanels
        })
        
    }
    
    // render
    
    renderTabpanel = (tabpanel, index) => {
        const { id, labelledby, children } = tabpanel;

        const selected = this.state.index === index;
        
        return (
            <div className="admin-finder__tabpanel" role="tabpanel"
                id={id} 
                aria-selected={selected}
                aria-labelledby={labelledby} key={id}>
                { children }
            </div>
        )
        
    }
    
    renderTab = (tab, index) => {
        const { id, controls, url, title } = tab;

        const selected = this.state.index === index;
        
        return (
            <ButtonTertiary key={id} title={title} url={url} id={id} controls={controls} role="tab" selected={selected} onClick={(event) => this.onSelect(tab, event)} />
        )
        
    }
    
    onSelect = (tab, event) => {
        
        const { id, index } = tab;
        
        this.setState({
            index: index,
            id: id
        })
        
        if (this.props.onSelect) {
            this.props.onSelect(tab, event)
        }
        
    }
    
    render() {
        const { tabs, tabpanels } = this.state;

        return (
            <div className="admin-finder__tabs" role="dialog">
                <nav className="nav-tabs">
                    { tabs.map(this.renderTab) }
                </nav>
                { tabpanels.map(this.renderTabpanel) }
            </div>
        )

    }

}

export default FinderTabs;