import _ from 'lodash';
import { getUiFieldset } from "."

import { utils } from "@rjsf/core";
const { getUiOptions, getDefaultFormState } = utils;

export const getPrimusEventsMenu = ({parent, onAdd, ...props}) => {
    const { formData, formContext } = props;
    const { _onEventAddClick } = formContext

    const events = formData.events && formData.events.map((event, index) => {

        const title = event.eventType && event.eventType.value || "Event " + index
        const count = event.dating && event.dating.value || null

        return {
            id: parent.id + "_" + index,
            title: title,
            count: count,
            name: index,
        }
    }) || []

    return {
        ...parent,
        role: "section",
        children: [
            ...events,
            {
                "icon": "add",
                "title": "Legg til",
                "onClick": onAdd
            }
        ]
    }

}