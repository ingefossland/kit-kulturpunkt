import React, { useState } from "react"
import moment from "moment"

import { utils } from "@rjsf/core"
const { getDefaultFormState } = utils

const weekdays = ["MO","TU","WE","TH","FR","SA","SU"]

const EventField = (props) => {
    const { SchemaField } = props.registry.fields;

    const allDay = props.formData && props.formData.allDay || false
    const dtStart = props.formData && props.formData.dtStart || null

    const schemaRRule = props.schema.properties.rrule

    let customRRule

    if (schemaRRule.enum && dtStart) {

        const dayIndex = moment(dtStart).format('d') * 1
        const byDay = weekdays[dayIndex-1]

        const rruleByDay = "FREQ=WEEKLY;BYDAY=" + byDay
        const rruleByYear = "FREQ=YEARLY"

        customRRule = {
            ...schemaRRule,
            enum: [
                ...schemaRRule.enum,
                rruleByDay,
                rruleByYear
            ],
            enumNames: [
                ...schemaRRule.enum,
                "Weekly on " + moment(dtStart).format('dddd'),
                "Yearly on " + moment(dtStart).format('ll').split(',')[0]
            ]
        }


    }

    const schema = {
        ...props.schema,
        properties: {
            ...props.schema.properties,
//            "rrule": customRRule || schemaRRule,

            "dtStart": {
                ...props.schema.properties.dtStart,
                "format": allDay && "date" || "date-time"
            },
            "dtEnd": {
                ...props.schema.properties.dtEnd,
                "format": allDay && "date" || "date-time"
            }
        }
    }

    const uiSchema = {
        ...props.uiSchema,
        "ui:field": undefined
    }

    const _onChange = (formData) => {
        let { allDay, date, startTime = "00:00", endTime = "00:00", dtStart, dtEnd } = formData

        if (date) {
            dtStart = date + " " + startTime
            dtEnd = date + " " + endTime
        }

        const formatDate = (date) => {
            return date && allDay && moment(date).format('YYYY-MM-DD') || date && moment(date).format('YYYY-MM-DDTHH:mm:ss') || undefined
        }

        if (!dtEnd && dtStart || moment(dtEnd).isBefore(moment(dtStart))) {
            dtEnd = dtStart
        }

        const time = allDay && "Hele dagen" || startTime !== endTime && startTime + "–" + endTime || startTime
        

        formData = {
            ...formData,
            time: time,
            dtStart: formatDate(dtStart),
            dtEnd: formatDate(dtEnd),
        }

        props.onChange(formData)

    }

    const formData = getDefaultFormState(schema, props.formData || undefined)

    return (
        <SchemaField {...props} formData={formData} schema={schema} uiSchema={uiSchema} onChange={_onChange} />
    )

}

EventField.defaultProps = {
    formData: {}
}

export default EventField