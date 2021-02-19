import React, { useEffect, useState } from "react"
import { makeStyles } from '@material-ui/core/styles';

import {
    MetaList,
    MetaListItem,
    MetaLabel,
    MetaValue,
    MetaCode,
} from "./"

const Classifications = ({items = [], onSelect}) => {



    const ClassificationItem = (item) => {

        const { uuid, value, system, systemId } = item

        const _onClick = (e) => onSelect(e, {
            ...item,
            source: "knav",
            sourceId: item.uuid,
            title: item.value,
            ...item
        })
    
        return (
            <MetaListItem>
                <MetaValue onClick={uuid && _onClick}>{value}</MetaValue>{' '}
                { systemId && <MetaCode>{system} {systemId}</MetaCode>  }
            </MetaListItem>
        )

    }

    return (
        <MetaList>
            {items.map((item, index) => <ClassificationItem {...item} key={index} />)}
        </MetaList>
    )


}

export default Classifications;