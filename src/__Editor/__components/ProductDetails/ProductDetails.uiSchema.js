export default {
    "ui:options": {
        "grid": true,
        "spacing": 2
    },
    "ui:fieldset": [
        "priceCategory",
        "price",
        "vatRate",
        "netPrice",
        "vatPrice",
    ],
    "title": {
        "ui:xs": 12,
        "ui:title": "Tittel"
    },
    "descrption": {
        "ui:xs": 12,
        "ui:title": "Beskrivelse",
        "ui:widget": "textarea"
    },
    "priceCategory": {
        "ui:xs": 12,
        "ui:title": "Produkttype"
    },
    "price": {
        "ui:xs": 3,
        "ui:title": "Brutto",
        "ui:prefix": "Kr"
    },
    "vatRate": {
        "ui:title": "Mva sats",
        "ui:xs": 3,
    },
    "netPrice": {
        "ui:xs": 3,
        "ui:title": "Netto",
        "ui:prefix": "Kr"
    },
    "vatPrice": {
        "ui:title": "Mva",
        "ui:xs": 3,
    }
}