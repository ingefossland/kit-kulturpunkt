import React from 'react';
import FinderModel from "./FinderModel"
import { useTranslation } from 'react-i18next';
import { NavPath } from "@kit-ui/admin"

import { PreviewModule } from "../components/PreviewModule"

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    group: {
        position: "relative",
        overflow: "hidden",

        "& + $group": {
            borderTop: "1px solid",
            borderColor: theme.palette.divider
        }

    },
    header: {
        position: "sticky",
        height: theme.spacing(8),
        display: "flex",
        alignItems: "center",
        zIndex: 1,
        padding: theme.spacing(0,1),
    },
    body: {
        display: "flex",
        flexWrap: "nowrap",
        minHeight: 250
    },  
}));

const GroupIcons = ({view, title, resultsLoaded, ...props}) => {
    const { t, i18n } = useTranslation('search');

    const { isLoading, resultsByPage, count, page, pages, onPage } = props

    const loadingTitle = t('Searching, please wait') + "...";
    const emptyTitle = t('No hits')

    const classes = useStyles()

    const variant = view.replace("group/", "")

    if (resultsLoaded && resultsLoaded.length) {
        return (
            <div className={classes.group}>

            <header className={classes.header}>
                <NavPath title={title} />
            </header>

            <div className={classes.body}>

                {resultsLoaded && resultsLoaded.map((model, index) => {
                    return (
                        <FinderModel {...props} model={model} variant={variant} key={index}>
                            <PreviewModule />
                        </FinderModel>
                    )
                })}

            </div>

        </div>            
        )
    }

    return (
        <div className={classes.group}>
            <header className={classes.header}>
                <NavPath title={title} />
            </header>
        </div>
    )

}

export default GroupIcons