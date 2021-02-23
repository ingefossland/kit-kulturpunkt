import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const getTemplateColumns = ({spacing = 1, minWidth, iconSize}) => {

    const width = iconSize + (spacing * 8)

    if (width > minWidth) {
        minWidth = width
    }

    return 'repeat(auto-fit, minmax('+minWidth+'px, max-content))'
}

const useStyles = makeStyles(theme => ({
    grid: {
        display: 'grid',
        gridTemplateColumns: props => { return getTemplateColumns(props) },
        gridGap: 0,
        padding: 'initial',
        justifyContent: 'center',

        "& > *": {
            margin: theme.spacing(1),
        }

    },
}));

/** IconsView */

const IconsView = ({spacing = 8, minWidth = 128, iconSize = 96, header, footer, children}) => {

    const classes = useStyles({iconSize, minWidth, spacing})

    return (
        <div className={classes.grid}>
            { header }
            { children }
            { footer }
        </div>
    )    

}


IconsView.defaultProps = {
}

IconsView.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    items: PropTypes.array,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
}

export default IconsView;
