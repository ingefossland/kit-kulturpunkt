export default {
    "ui:fieldset": [
        "preview",
        "content",
        "imageCropdata",
        "imageAnnotations"
    ],
    "content": {
        "ui:title": "Rediger innhold",
        "ui:field": "primusSection",

        "ui:fieldset": [
            "creator",
            "credit",
            "license"
        ],


        "creator": {
            "ui:title": "Fotograf",
        },
        "headline": {
            "ui:title": "Overskrift"
        },
        "description": {
            "ui:title": "Beskrivelse",
            "ui:widget": "textarea"
        },
        "credit": {
            "ui:title": "Kreditering",
            "ui:widget": "textarea",
            "ui:help": "Fotograf og/eller byrå"
        },
        "license": {
            "ui:title": "Rettigheter",
            "ui:field": "primusLicense",
            "ui:help": "Velg en lisens eller rettigheter"
        }

    },
    "imageAnnotations": {
        "ui:title": "Annoteringer",
        "ui:field": "primusImageAnnotationsSection",
        "ui:options": {
            "sortable": true
        },
        "items": {
            "ui:layout": "module"
        }
    }
}