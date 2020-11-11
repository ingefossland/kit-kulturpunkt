import React from 'react';
import { SchemaEditor } from "@kit-ui/schema";
import model from "./EventField.model"

import EventField from "./EventField"

export default {
    title: 'CustomFields/EventField',
    component: EventField,
    args: {
        ...model,
        uiSchema: {
            "ui:field": EventField
        }
    },
    argTypes: {
    },
};

const Template = (args) => <SchemaEditor {...args} />

export const Default = Template.bind({});
Default.args = {
}

export const EveryWednesday = Template.bind({})
EveryWednesday.args = {
    formData: {
        rrule: "FREQ=WEEKLY;BYDAY=WE"
    }
}

export const EveryFebruary6 = Template.bind({})
EveryFebruary6.args = {
    formData: {
        date: "1958-02-06",
        title: "Munich anniversary",
        allDay: true,
        rrule: "FREQ=YEARLY;BYMONTH=2;BYMONTHDAY=6"
    }
}

export const CustomRRule = Template.bind({})
CustomRRule.args = {
    formData: {
        date: "1958-02-06",
        title: "Munich anniversary",
        allDay: true,
        rrule: "custom",
        rrules: {
            "FREQ": "WEEKLY"
        }
    }
}