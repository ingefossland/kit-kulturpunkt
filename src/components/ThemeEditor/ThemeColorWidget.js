import React, { useEffect, useState } from 'react';
import PropTypes from "prop-types"
import tinycolor from 'tinycolor2';
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles" 

const useStyles = makeStyles(theme => ({
    swatch: {
        backgroundColor: props => { return props.backgroundColor },
        color: props => { return theme.palette.getContrastText(props.backgroundColor) },
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",

        "& input": {
            fontFamily: "Akkurat mono, monospace",
            fontSize: props => { return props.size === "large" && 24 },
            paddingBottom: props => { return props.size === "large" && 10 + 24 }
        },

        "& *": {
            color: "inherit"
        }

    }
}));

const CollectionThemeColorWidget = (props) => {

    const {
        onChange,
        registry,
        options
    } = props

    const [value, setValue] = useState(props.value)

    const classes = useStyles({backgroundColor: props.value, size: options && options.size})

    const _getColor = (color) => {
        return "#" + tinycolor(color).toHex()
    }

    useEffect(() => {
        setValue(props.value)
    }, [props.value])

    const _onChange = (value) => {

        if (tinycolor(value).isValid()) {
            onChange && onChange(_getColor(value))
        }

        setValue(value)

    }

    const { TextWidget } = registry.widgets

    return (
        <TextWidget {...props} className={classes.swatch} value={value} onChange={_onChange} />
    )

}

CollectionThemeColorWidget.defaultProps = {
    value: "#666"
}

CollectionThemeColorWidget.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func
}

export default CollectionThemeColorWidget;