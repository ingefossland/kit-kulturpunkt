import React, { useState, useEffect } from 'react';
import _ from "lodash"

import { 
    ListView, 
    ListModule, 
    ButtonAdd, 
    ButtonRemove
} from "@kit-ui/admin"

const DocumentChildrenList = ({title, resultsLoaded, onRemove, onEdit}) => {

    const DocumentModule = (model) => {

        return (
            <ListModule {...model}
                primaryButton={<ButtonRemove onClick={() => onRemove(model)} />}
                editable={true}
                onEdit={() => onEdit(model)}
            />
        )

    }

    return (

        <ListView title={title}>
            {resultsLoaded && resultsLoaded.map((model, index) => <DocumentModule {...model} key={index} />)}
        </ListView>

    )
    

}

export default DocumentChildrenList