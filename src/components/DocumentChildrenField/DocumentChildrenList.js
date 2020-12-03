import React, { useState, useEffect } from 'react';
import _ from "lodash"

import { 
    ListView, 
    ListModule, 
    ButtonAdd, 
    ButtonRemove
} from "@kit-ui/admin"

const DocumentChildrenList = ({resultsLoaded}) => {

    return (

        <ListView>
            {resultsLoaded && resultsLoaded.map(model => <ListModule {...model} primaryButton={<ButtonRemove />} />)}
        </ListView>

    )
    

}

export default DocumentChildrenList