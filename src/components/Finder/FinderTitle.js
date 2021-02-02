import React, { Component } from 'react';
import "./FinderTitle.scss"

class FinderTitle extends Component {
    
    render() {
        const { title } = this.props;
        
        if (!title) {
            return false;
        }
        
        return (
            <h2 className="admin-finder__title">{title}</h2>
        )
    }
}

export default FinderTitle;