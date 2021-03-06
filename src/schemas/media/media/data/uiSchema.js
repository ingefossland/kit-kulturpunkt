export default {
    "ui:options": {
        "spacing": 2
    },
    "ui:fieldset": [
        "filename",
        "title",
        "description",
        "category",
        "credit",
        "license",
        "keywords"
    ],
    "filename": {
        "ui:title": "Originalt filnavn",
        "ui:help": "Navn på filen som ble lastet opp."
    },
    "title": {
        "ui:title": "Tittel",
    },
    "description": {
        "ui:title": "Beskrivelse",
        "ui:widget": "textarea",
    },
   "category": {
        "ui:title": "Kategori",
        "ui:placeholder": "Velg kategori"
    },
    "credit": {
        "ui:title": "Kreditering",
        "ui:help": "Opphavsrett, person eller organisasjon",
    },
    "keywords": {
        "ui:widget": "tags",
        "ui:title": "Nøkkelord",
        "ui:help": "Beskrivende stikkord.",
    },
    "license": {
        "ui:widget": "selectLicense",
        "ui:title": "Lisens",
        "ui:help": "Velg en lisens for dette innholdet.",
    },
}