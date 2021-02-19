import PrimusMediaEditorField from "./PrimusMediaEditorField"
import PrimusMediaModel from "./PrimusMedia.model"

import PrimusMediaSectionField from "./PrimusMediaSectionField"
import PrimusMediaSectionLayout from "./PrimusMediaSectionLayout"

import ImageAnnotationsSectionField from "./ImageAnnotationsSectionField"
import ImageAnnotationsSectionLayout from "./ImageAnnotationsSectionLayout"

import ImageAnnotationsModuleField from "./ImageAnnotationsModuleField"
import ImageAnnotationsModuleLayout from "./ImageAnnotationsModuleLayout"

export default {
    "fields": {
        "primusMediaEditor": PrimusMediaEditorField,
        "primusMediaSection": PrimusMediaSectionField,
        "primusMediaSectionLayout": PrimusMediaSectionLayout,
        "primusImageAnnotationsSection": ImageAnnotationsSectionField,
        "primusImageAnnotationsSectionLayout": ImageAnnotationsSectionLayout,
        "primusImageAnnotationsModule": ImageAnnotationsModuleField,
        "primusImageAnnotationsModuleLayout": ImageAnnotationsModuleLayout,

    },
    "widgets": {
    },
    "models": {
        "primusMedia": PrimusMediaModel
    }
}