
import React from "react"
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    options: {
        position: "absolute",
        zIndex: 2,
        top: "auto",
        right: 0,
        bottom: 0,
        left: 0,

        display: "flex",
        justifyContent: "center",

        "& > *": {
            margin: theme.spacing(.5)
        },

        margin: theme.spacing(1)

    },
}));


const PreviewChip = ({label, title, selected, onClick}) => {

    if (selected) {
        return (
            <Chip
                label={label || title}
                color="primary"
            />
        )
    }

    return (
        <Chip
            label={label || title}
            color="default"
            onClick={onClick}
        />
    )

}

const NavPreview = ({className, options = [], value, onChange}) => {

    const classes = useStyles()

    const _onChange = ({value}) => {
        onChange && onChange(value)
    }

    return (
        <nav className={className || classes.options}>
            {options.map((item, index) => (<PreviewChip {...item} selected={value === item.value} key={index} onClick={() => _onChange(item)} />))}
        </nav>
    )
    
}

export default NavPreview