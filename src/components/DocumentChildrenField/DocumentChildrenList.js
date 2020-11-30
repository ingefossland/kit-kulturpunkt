import React, { useState, useEffect } from 'react';
import { WidgetSearch, ListView, ListModule, ButtonAdd, ButtonRemove } from ".."
import _ from "lodash"

const DocumentChildrenList = ({resultsLoaded}) => {

    return (

        <ListView>
            {resultsLoaded && resultsLoaded.map(model => <ListModule {...model} primaryButton={<ButtonRemove />} />)}
        </ListView>

    )
    

}

export default DocumentChildrenList