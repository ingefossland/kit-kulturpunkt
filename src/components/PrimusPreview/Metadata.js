import React, { useEffect, useState } from "react"
import { makeStyles } from '@material-ui/core/styles';

import {
    MetaList,
    MetaListItem,
    MetaLabel,
    MetaValue,
    MetaCode,
} from "./"

const useStyles = makeStyles(theme => ({

}));

const Metadata = ({items = [], onSelect}) => {

    const MetaItemValue = (item) => {

        const { uuid, value } = item

        const _onClick = (e) => onSelect(e, {
            ...item,
            source: "knav",
            sourceId: uuid,
            title: value,
            ...item
        })

        return (
            <MetaValue onClick={uuid && _onClick}>{value}</MetaValue>
        )
    }

    const MetaItem = ({inline, values, ...item}) => {

        const { uuid, label, value, code } = item

        if (values) {

            if (!inline) {

                return (
                    <MetaListItem>
                        <MetaLabel>{label}</MetaLabel>
                        <MetaList>
                            {values.map((value, index) => <MetaItem {...value} label={false} key={index} />)}                        
                        </MetaList>
                    </MetaListItem>
                )
    
                
            }

            return (
                <MetaListItem>
                    <MetaLabel>{label}</MetaLabel>
                    {values.map((value, index) => <MetaItemValue {...value} label={false} key={index} />)}                        
                </MetaListItem>
            )
                
        }


        return (
            <MetaListItem>
                { label && <MetaLabel>{label}</MetaLabel>  }
                <MetaItemValue {...item} />
                { code && " "}
                { code && <MetaCode>{code}</MetaCode>}
            </MetaListItem>
        )

    }

    return (
        <MetaList>
            {items.map((item, index) => <MetaItem {...item} key={index} />)}
        </MetaList>
    )


}

export default Metadata;