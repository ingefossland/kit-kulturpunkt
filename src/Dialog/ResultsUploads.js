import React from 'react';
//import { ListLayout } from "@kit-ui/admin"
import { useTranslation } from 'react-i18next';

import ResultsLoader from "./ResultsLoader"
import ResultsFooter from "./ResultsFooter"
import DialogModel from "./DialogModel"

const ListLayout = ({children}) => {
    return children
}


const ResultsUploads = ({layout = "list", query = {}, results = {}, ...props}) => {
    const { uploads, resultsLoaded, selected } = results
    const { t, i18n } = useTranslation('upload');

    if (query.q) {

        return (
            <ResultsLoader {...props}>
                <ListLayout padding={2} title="Searching uploads">
                    {resultsLoaded && resultsLoaded.map((model, index) => {
                        return (
                            <DialogModel model={model} layout={layout} modelsSelected={selected} {...props} key={index} />
                        )
                    })}
                </ListLayout>
                <ResultsFooter {...props} />
            </ResultsLoader>
        )
        
    }

    if (!uploads.length) {
        return false
    }

    const count = uploads.length;
    const title = t('{{count}} new uploads today', {count});

    return (
        <ListLayout padding={2}>
            { uploads && uploads.map((model, index) => {
                return (
                    <DialogModel {...props} model={model} modelsSelected={selected} layout="list" key={index} />
                )
            })}
        </ListLayout>
    )

}

export default ResultsUploads;