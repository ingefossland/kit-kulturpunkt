import React, { useState, useEffect } from 'react';
import { WidgetSearch, List, ListModule, ButtonAdd, ButtonRemove } from ".."
import _ from "lodash"

const DocumentChildrenList = ({resultsLoaded}) => {

    return (

        <List>
            {resultsLoaded && resultsLoaded.map(model => <ListModule {...model} primaryButton={<ButtonRemove />} />)}
        </List>

    )
    

}

export default DocumentChildrenList