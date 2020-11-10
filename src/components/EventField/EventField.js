import React, { useState, useEffect } from "react"
import moment from "moment"
import { getRRuleFromFormData, getFormDataFromRRule, getRRuleText } from "./utils"

import model from "./EventField.model"

import { utils } from "@rjsf/core";
const { getUiOptions, getDefaultFormState } = utils

const byWeekday = ["MO","TU","WE","TH","FR","SA","SU"]

const EventField = (props) => {

    const { formData } = props

    const schema = {
        ...model.schema,
        ...props.schema
    }

    const uiSchema = {
        ...model.uiSchema,
        ...props.uiSchema
    }

    // set initial dtStart + rrule + rrules

    const [rrule, setRRule] = useState(formData.rrule)
    const [rruleText, setRRuleText] = useState(rrule)
    const [rrules, setRRules] = useState(formData.rrules)

    // onChange

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

    // rrules from rrule

    useEffect(() => {

        let rrules;

        if (formData.rrule && formData.rrule !== "custom") {
            rrules = getFormDataFromRRule(formData.rrule)
        } else if (!formData.rrule) {
            rrules = getDefaultFormState({schema: schema.properties.rrules})
        }

        rrules && setRRules(rrules)
        setRRule(formData.rrule)

    }, [formData.rrule])
    
    // rrule from rrules

    useEffect(() => {

        let rrule;

        if (formData.rrule === "custom") {
            rrule = getRRuleFromFormData(formData.rrules)
        }

        rrule && setRRule(rrule)
        rrule && setRRuleText(getRRuleText(rrule))

        setRRules(formData.rrules)

    }, [formData.rrules])    


    // get dtStart rules

    const [dtEnum, setDtEnum] = useState([])
    const [dtEnumNames, setDtEnumNames] = useState([])
    
    useEffect(() => {
        const isoWeekday = moment(formData.dtStart).isoWeekday()
        const isoMonth = moment(formData.dtStart).month() + 1
        const dayOfMonth = moment(formData.dtStart).format('D')

        const weekly = "FREQ=WEEKLY;BYDAY="+byWeekday[isoWeekday-1]
        const monthly = "FREQ=MONTHLY;BYMONTHDAY="+dayOfMonth
        const yearly = "FREQ=YEARLY;BYMONTH="+isoMonth+";BYMONTHDAY="+dayOfMonth

        setDtEnum([
            weekly,
            monthly,
            yearly
        ])
        
    }, [formData.dtStart])

    // get rrules enum

    const getRRuleSchema = () => {

        const rruleSchema = schema.properties.rrule

        const defaultRRuleEnum = rruleSchema && rruleSchema.enum
        const defaultRRuleEnumNames = rruleSchema && rruleSchema.enumNames


        let rruleEnum = [], customEnumName, falseEnumName

        defaultRRuleEnum.map((rrule, index) => {

            if (rrule === "custom") {
                customEnumName = defaultRRuleEnumNames[index]
            } else if (rrule) {
                rruleEnum.push(rrule)
            } else {
                rruleEnum.push(rrule)
                falseEnumName = defaultRRuleEnumNames[index] || rrule
            }
        })

        rruleEnum = rruleEnum.concat(dtEnum)

        if (defaultRRuleEnum.includes("custom")) {
            rruleEnum.push("custom")
        }

        if (rrule && rrule !== "custom" && !rruleEnum.includes(rrule)) {
            customEnumName = getRRuleText(rrule)
        }
        
        const rruleEnumNames = rruleEnum.map((rrule, index) => {

            if (rrule === "custom") {
                return customEnumName
            } else if (rrule) {
                return getRRuleText(rrule)
            } else {
                return falseEnumName
            }


        })

        return {
            ...rruleSchema,
            enum: rruleEnum,
            enumNames: rruleEnumNames
        }

    }

    // schema, formData, etc

    const newSchema = {
        ...schema,
        properties: {
            ...schema.properties,
            rrule: getRRuleSchema()
        }
    }

    const newFormData = {
        ...formData,
//        rrule: rrule,
        rrules: rrules
    }

    // formData

    const { ObjectField } = props.registry.fields;

    return (
        <ObjectField
            {...props}
            schema={newSchema}
            uiSchema={uiSchema}
            formData={newFormData}
            onChange={_onChange}
            />
    )

}

EventField.defaultProps = {
    formData: {
        
    }
}

export default EventField