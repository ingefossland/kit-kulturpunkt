import { RRule, RRuleSet, rrulestr } from 'rrule'

export const getRRuleText = (rrule) => {

    let rule

    if (rrule) {
        rule = RRule.fromString("RRULE:"+rrule)
    }

    return rule && rule.toText()
    
}

export default getRRuleText