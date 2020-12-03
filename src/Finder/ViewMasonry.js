import React from 'react';
import FinderModel from "./FinderModel"
import { useTranslation } from 'react-i18next';
import { MasonryView, MasonryModule } from "@kit-ui/admin"

const ViewList = ({resultsLoaded, ...props}) => {
    const { t, i18n } = useTranslation('search');

    const { isLoading, resultsByPage, count, page, pages, onPage } = props

    const title = props.title || t('{{count}} hits', { count });
    const description = t('{{page}} of {{pages}} pages', { pages, page });
    const loadingTitle = t('Searching, please wait') + "...";
    const emptyTitle = t('No hits')

    const pagedResults = resultsByPage && resultsByPage[page]

    if (isLoading) {
        return <MasonryView title={loadingTitle} />
    } else if (!count) {
        return <MasonryView title={emptyTitle} />
    }
    
    return (
        <MasonryView {...props} title={title} description={description}>
            {pagedResults && pagedResults.map((model, index) => {
                return (
                    <FinderModel {...props} model={model} key={index}>
                        <MasonryModule />
                    </FinderModel>
                )
            })}
        </MasonryView>
    )

}

export default ViewList