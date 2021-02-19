// primus editor

import PrimusEditorField from "./PrimusEditorField"
import PrimusEditorLayout from "./PrimusEditorLayout"

import PrimusContentField from "./PrimusContentField"
import PrimusContentLayout from "./PrimusContentLayout"

import PrimusSectionField from "./PrimusSectionField"
import PrimusSectionLayout from "./PrimusSectionLayout"

import PrimusMediaField from "./PrimusMediaField"
import PrimusMediaLayout from "./PrimusMediaLayout"

// etcetera

import SelectAdornmentWidget from "./SelectAdornmentWidget"
import SelectNativeWidget from "./SelectNativeWidget"
import PrimusFieldsetLayout from "./PrimusFieldsetLayout"

// knav

import KnavSearchField from "./KnavSearchField"
import KnavTagsField from "./KnavTagsField"


// designation

import DesignationField from "./DesignationField"
import DesignationModel from "./Designation.model"
import DesignationTagsField from "./DesignationTagsField"

// classification

import ClassificationField from "./ClassificationField"
import ClassificationModel from "./Classification.model"
import ClassificationTagsField from "./ClassificationTagsField"

// materials

import MaterialField from "./MaterialField"
import MaterialModel from "./Material.model"
import MaterialTagsField from "./MaterialTagsField"

// techniques

import TechniqueField from "./TechniqueField"
import TechniqueModel from "./Technique.model"
import TechniqueTagsField from "./TechniqueTagsField"

// color

import ColorModel from "./Color.model"
import ColorTagsField from "./ColorTagsField"

// measure

import MeasureField from "./MeasureField"
import MeasureModel from "./Measure.model"
import MeasuresListField from "./MeasuresListField"
import MeasureTagsField from "./MeasureTagsField"

// person

import PersonField from "./PersonField"
import PersonModel from "./Person.model"
import PeopleListField from "./PeopleListField"
import PeopleTagsField from "./PeopleTagsField"

// place

import PlaceField from "./PlaceField"
import PlaceModel from "./Place.model"
import PlacesListField from "./PlacesListField"
import PlaceTagsField from "./PlaceTagsField"

// object?

import ObjectField from "./ObjectField"

// dating

import DatingField from "./DatingField"
import DatingModel from "./Dating.model"

// events

import EventField from "./EventField"
import EventModel from "./Event.model"

import EventTypeField from "./EventTypeField"
import EventTypeModel from "./EventType.model"
import EventsListField from "./EventsListField"

// license

import LicenseField from "./LicenseField"


export default {
    "fields": {
        "primusEditor": PrimusEditorField,
        "primusEditorLayout": PrimusEditorLayout,

        "primusContent": PrimusContentField,
        "primusContentLayout": PrimusContentLayout,

        "primusSection": PrimusSectionField,
        "primusSectionLayout": PrimusSectionLayout,

        "primusMedia": PrimusMediaField,
        "primusMediaLayout": PrimusMediaLayout,

        "knavSearchField": KnavSearchField,
        "knavTagsField": KnavTagsField,

        "primusClassification": ClassificationField,
        "primusClassificationTags": ClassificationTagsField,

        "primusDesignation": DesignationField,
        "primusDesignationTags": DesignationTagsField,

        "primusMeasure": MeasureField,
        "primusMeasures": MeasuresListField,
        "primusMeasureTags": MeasureTagsField,

        "primusMaterial": MaterialField,
        "primusMaterialTags": MaterialTagsField,

        "primusTechnique": TechniqueField,
        "primusTechniqueTags": TechniqueTagsField,

        "primusColorTags": ColorTagsField,

        "primusObject": ObjectField,

        "primusPerson": PersonField,
        "primusPeople": PeopleListField,
        "primusPeopleTags": PeopleTagsField,

        "primusPlace": PlaceField,
        "primusPlaces": PlacesListField,
        "primusPlaceTags": PlaceTagsField,

        "primusEvent": EventField,
        "primusEvents": EventsListField,

        "primusEventType": EventTypeField,
        "primusEvents": EventsListField,

        "primusDating": DatingField,

        "primusLicense": LicenseField,

        "primusFieldsetLayout": PrimusFieldsetLayout,
//        "primusList": PrimusListField,
//        "primusListLayout": PrimusListLayout,
//        "primusListItemLayout": PrimusListItemLayout,
    },
    "widgets": {
        "selectAdornment": SelectAdornmentWidget,
        "selectNative": SelectNativeWidget,
    },
    "models": {
        "primusDesignation": DesignationModel,
        "primusClassification": ClassificationModel,
        "primusMeasure": MeasureModel,
        "primusTechnique": TechniqueModel,
        "primusMaterial": MaterialModel,
        "primusColor": ColorModel,

        "primusEvent": EventModel,
        "primusEventType": EventTypeModel,

        "primusPerson": PersonModel,
        "primusPlace": PlaceModel,
        "primusDating": DatingModel,
    }
}