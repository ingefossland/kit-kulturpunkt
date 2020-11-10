import React from 'react';

import MediaResults from "./MediaResults"
import DocumentsResults from "./DocumentsResults"
import ResultsDefault from "./SearchResultsDefault"

const templates = {
    "default": ResultsDefault,
    "media": MediaResults,
    "youtube": MediaResults,
    "vimeo": MediaResults,
    "sketchfab": MediaResults,
    "documents": DocumentsResults,
    "ekultur": DocumentsResults
}

const SearchResults = ({query = {}, ...props}) => {

    const ResultsTemplate = query.models && templates && templates[query.models] || templates['default']

    if (!ResultsTemplate) {
        return (
            <p>No template for {query.models}</p>
        )
    }

    return (
        <ResultsTemplate 
            {...props}
            query={query} />
    )

    
}

export default SearchResults