import React, { Component } from 'react';
import "./FinderLabel.scss"

class FinderLabel extends Component {
    
    render() {
        const { label } = this.props;
        
        if (!label) {
            return false;
        }
        
        return (
            <h2 className="admin-finder__label">{label}</h2>
        )
    }
}

export default FinderLabel;