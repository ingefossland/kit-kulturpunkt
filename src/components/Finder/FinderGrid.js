import React, { Component } from 'react';
import "./FinderGrid.scss";

class FinderGrid extends Component {

    static defaultProps = {
        style: {},
        gap: undefined,
        cols: undefined,
        rows: undefined,
        areas: undefined
    }

    getStyle = () => {
        let { style, cols, rows, gap, areas } = this.props;
        
        return {
            ...style,
            display: "grid",
            gridGap: gap,
            gridTemplateColumns: cols,
            gridTemplateRows: rows,
            gridTemplateAreas: areas
        }
        
    }
    
    render() {
        const style = this.getStyle()
        
        return (
            <section className="admin-finder__grid" style={style}>
                { this.props.children }
            </section>
        )
    }
}

export default FinderGrid;