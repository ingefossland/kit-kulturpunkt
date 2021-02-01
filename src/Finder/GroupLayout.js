import React from 'react';
import FinderModel from "./FinderModel"
import { useTranslation } from 'react-i18next';
import { IconsView, IconsModule, NavPath } from "@kit-ui/admin"

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    group: {
        position: "relative",
        overflow: "hidden"
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
        flexWrap: "nowrap"
    },  
}));

const GroupLayout = ({title, children}) => {
    const { t, i18n } = useTranslation('search');

    const { isLoading, resultsByPage, count, page, pages, onPage } = props

    const loadingTitle = t('Searching, please wait') + "...";
    const emptyTitle = t('No hits')

    const classes = useStyles()

    if (isLoading) {
        return <IconsView title={loadingTitle} />
    } else if (!count) {
        return <IconsView title={emptyTitle} />
    }

    return (
        <div className={classes.group}>

            <header className={classes.header}>
                <NavPath title={title} />
            </header>

            <div className={classes.body}>
                {children}
            </div>

        </div>
    )

}

export default GroupLayout