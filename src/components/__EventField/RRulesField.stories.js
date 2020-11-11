import React from 'react';
import { SchemaEditor } from "@kit-ui/schema";
import RRulesField from "./RRulesField"
import model from "./RRulesField.model"

export default {
    title: 'CustomFields/RRulesField',
    component: RRulesField,
    args: {
        ...model,
        uiSchema: {
            "ui:field": RRulesField
        }
    },
    argTypes: {
    },
};

const Template = (args) => <SchemaEditor {...args} />

export const Default = Template.bind({});
Default.args = {
}

export const YearlyOnJanuary2nd = Template.bind({});
YearlyOnJanuary2nd.args = {
    schema: {
    },
    uiSchema: {
    },
    formData: {
        "FREQ": "YEARLY",
        "BYMONTH": ["1"],
        "BYMONTHDAY": ["2"]
    }
}

export const YearlyOnFirstMondayOfFebruary = Template.bind({});
YearlyOnFirstMondayOfFebruary.args = {
    schema: {
    },
    uiSchema: {
    },
    formData: {
        "FREQ": "YEARLY",
        "BYDAY": ["MO"],
        "BYSETPOS": [1],
        "BYMONTH": [2]
    }
}


export const MonthlyOnFirstSunday = Template.bind({});
MonthlyOnFirstSunday.args = {
    schema: {
    },
    uiSchema: {
    },
    formData: {
        "FREQ":"MONTHLY",
        "BYSETPOS":[ 1],
        "BYDAY": ["SU"],
        "INTERVAL": 2
    }
}

export const MonthlyOnDay5 = Template.bind({});
MonthlyOnDay5.args = {
    schema: {
    },
    uiSchema: {
    },
    formData: {
        "FREQ":"MONTHLY",
        "BYMONTHDAY":[5],
        "INTERVAL":2
    }
}


export const WeeklyOnFridays = Template.bind({});
WeeklyOnFridays.args = {
    schema: {
    },
    uiSchema: {
    },
    formData: {
        "FREQ":"WEEKLY",
        "BYDAY":["FR"],
        "INTERVAL":2
    }
}

export const WeeklyOnWeekends= Template.bind({});
WeeklyOnWeekends.args = {
    schema: {
    },
    uiSchema: {
    },
    formData: {
        "FREQ":"WEEKLY",
        "BYDAY":["SA","SU"],
        "INTERVAL":2
    }
}