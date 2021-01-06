export default {
    "ui:options": {
        "grid": true,
        "spacing": 2
    },
    "ui:fieldset": [
        "title",
        "category",
        "description",
        "headline",
        "caption",
        "byline",
    ],
    "title": {
        "ui:title": "Tittel",
        "ui:help": "Referansetittel. Brukes primært til gjenfinning."
    },
    "headline": {
        "ui:title": "Stikktittel",
        "ui:help": "Kort oppsummering av innholdet."
    },
    "caption": {
        "ui:title": "Bildetekst",
        "ui:help": "Hvem, hva, hvor. Beskrivelse av innholdet.",
        "ui:widget": "textarea"
    },
    "description": {
        "ui:title": "Beskrivelse/alternativ tekst",
        "ui:help": "Beskrivende tekst til bruk når bildet ikke kan vises.",
        "ui:widget": "textarea"
    },
    "category": {
        "ui:title": "Kategori",
        "ui:placeholder": "Velg kategori"
    },
    "byline": {
        "ui:title": "Byline",
        "ui:help": "Opphavsrett, person eller organisasjon"
    },
    "copyright": {
        "ui:title": "Copyright",
        "ui:help": "Beskrivelse av opphavsrett"
    },
    "keywords": {
        "ui:widget": "tags",
        "ui:title": "Stikkord",
        "ui:help": "Enter keyword terms or phrases to describe the subject of content in the photograph.",
    },
    "license": {
        "ui:widget": "selectLicense",
        "ui:title": "Lisens",
        "ui:help": "Velg en lisens for dette innholdet.",
    }
}