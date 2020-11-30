import React from 'react';
import FinderModel from "./FinderModel"
import { useTranslation } from 'react-i18next';
import { ListView, ListModule } from "../components"

const ViewList = ({resultsLoaded, ...props}) => {
    const { t, i18n } = useTranslation('search');

    const { resultsByPage, count, page, pages, onPage } = props

    const title = props.title || t('{{count}} hits', { count });
    const description = t('{{page}} of {{pages}} pages', { pages, page });
    const loadingTitle = t('Searching, please wait') + "...";
    const emptyTitle = t('No hits')

    const pagedResults = resultsByPage && resultsByPage[page]

    return (
        <ListView {...props} loadingTitle={loadingTitle} emptyTitle={emptyTitle} title={title} description={description}>
            {pagedResults && pagedResults.map((model, index) => {
                return (
                    <FinderModel {...props} model={model}>
                        <ListModule {...model} key={index} />
                    </FinderModel>
                )
            })}
        </ListView>
    )

}

export default ViewList