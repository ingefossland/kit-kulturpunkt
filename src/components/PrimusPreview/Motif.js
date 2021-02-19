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

    const classes = useStyles()

    const MetaValues = ({values}) => {

        return values.map((item, index) => {

            if (typeof item === "string") {
                item = {
                    value: item
                }
            }

            const { uuid, value } = item

            const _onClick = (e) => onSelect(e, {
                ...item,
                source: "knav",
                sourceId: uuid,
                title: value,
                ...item
            })

            return (
                <MetaValue onClick={uuid && _onClick} key={index}>{value}</MetaValue>
            )
        })

    }

    const MetaItem = ({values, ...item}) => {

        const { uuid, label, value, code } = item

        if (values) {
            return (
                <MetaListItem>
                    <MetaLabel>{label}</MetaLabel>
                    <MetaValues values={values} />
                </MetaListItem>
            )
                
        }

        const _onClick = (e) => onSelect(e, {
            ...item,
            source: "knav",
            sourceId: uuid,
            title: value,
            ...item
        })

        return (
            <MetaListItem>
                <MetaLabel>{label}</MetaLabel>
                <MetaValue onClick={uuid && _onClick}>{value}</MetaValue>
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