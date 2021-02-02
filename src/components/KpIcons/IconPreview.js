import React from "react"
//import Icon from "@material-ui/core/Icon"
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    row: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
    },
    icon: {
        fontSize: props => { return props.fontSize },
        margin: theme.spacing(1),
        "& > svg": {
            fontSize: "inherit"
        }
    },
}));

const IconSizes = ({icons, children, sizes = [20,24,36,72,96]}) => {

    const classes = useStyles()

    if (!icons && children) {
        icons = [children]
    }


    const Icon = ({children, fontSize}) => {

        const classes = useStyles({fontSize: fontSize})

        return (
            <div>
                <div className={classes.icon}>
                    {children}
                </div>
                <div>{fontSize}px</div>
            </div>
        )
    }

    return (
        <div className={classes.grid}>
            { icons && icons.map((icon, index) => {
                return (
                    <div className={classes.row}>
                        { sizes.map(fontSize => (
                            <Icon fontSize={fontSize} >
                                {icon}
                            </Icon>
                        ))}
                    </div>
                )
            })}

        </div>
    )

}

export default IconSizes