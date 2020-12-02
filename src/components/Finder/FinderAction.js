import React, { Component } from 'react';
import "./FinderAction.scss"

class FinderAction extends Component {
    render() {
        const { expanded } = this.props;

        return (
            <div className="admin-finder__action" aria-expanded={expanded}>
                {this.props.children}
            </div>
        )
    }
}

export default FinderAction;