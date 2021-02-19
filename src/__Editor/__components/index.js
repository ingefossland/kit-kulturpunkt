import ProductDetailsField from "./ProductDetails/ProductDetailsField"

import ParentIdField from "./ParentId/ParentIdField"
import ChildrenArrayField from "./ChildrenArray/ChildrenArrayField"

import EventField from "./IcalEvent/EventField"
import ProgramEventLayout from "./IcalEvent/ProgramEventLayout"

import RRulesField from "./IcalEvent/RRulesField"
import RRulesLayout from "./IcalEvent/RRulesLayout"

import ByDayWidget from "./IcalEvent/ByDayWidget"
import ByMonthWidget from "./IcalEvent/ByMonthWidget"
import ByMonthDayWidget from "./IcalEvent/ByMonthDayWidget"

import TicketCategoryReferenceField from "./TicketCategory/TicketCategoryReferenceField"

export const fields = {
    "productDetails": ProductDetailsField,
    "parentId": ParentIdField,
    "childrenArray": ChildrenArrayField,
    "icalEvent": EventField,
    "icalRRules": RRulesField,
    "icalRRulesLayout": RRulesLayout,
    "programEventLayout": ProgramEventLayout,
    "ticketCategoryReference": TicketCategoryReferenceField
}

export const widgets = {
    "byDay": ByDayWidget,
    "byMonth": ByMonthWidget,
    "byMonthDay": ByMonthDayWidget,
}
