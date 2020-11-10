import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from "prop-types"

import FormLabel from "@material-ui/core/FormLabel";
import FormGroup from "@material-ui/core/FormGroup";

const useStyles = makeStyles(theme => ({
    fieldset: {
        display: "flex",
        flexDirection: "column",
        border: "1px solid",
        borderColor: theme.palette.divider,
        padding: props => { return theme.spacing(props.padding) },
        margin: props => { return theme.spacing(props.spacing * -1/2) },

        "& > *": {
            margin: props => { return theme.spacing(props.spacing * 1/2) }   
        }
    },
    header: {
    }
}));

const RRulesLayout = ({title, children, ...props}) => {

    const classes = useStyles(props)

    if (!children) {
        return false
    }

    
    return (
        <div className={classes.fieldset}>
            { title && <FormLabel className={classes.header}>{title}</FormLabel> }
            <FormGroup row={true}>{children}</FormGroup>
        </div>
    )

}

RRulesLayout.propTypes = {
    expanded: PropTypes.bool,
    onToggle: PropTypes.func
}

RRulesLayout.defaultProps = {
    position: "relative",
    padding: 2,
    collapsible: false,
    expanded: true
}

export default RRulesLayout;