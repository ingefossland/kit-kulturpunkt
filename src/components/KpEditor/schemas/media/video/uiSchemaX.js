import uiPreview from './uiPreview';

export default {
    "ui:field": "pageEditor",
    "ui:preview": uiPreview,
    "ui:fieldset": [
        "content"
    ],
    "content": {
        "ui:field": "pageContent",
        "ui:nav": true,
        "ui:fieldset": [
            "video",
            "metadata",
            "rights"
        ],
  

  "video": {
    "ui:layout": "section",
    "ui:icon": "movie",
    "ui:title": "Video",

    "ui:fieldset": [
      "title",
      "headline",
      "description",
      "descriptionWriter",
      "creditLine",
      "volume",
      "category",
      "keywords"
    ],

    "title": {
      "ui:title": "Tittel",
      "ui:help": "Tittel, primært brukt for identifikasjon."
    },
    "headline": {
       "ui:title": "Overskrift",
      "ui:help": "Kort beskrivelse av innholdet."
     },
     "description": {
       "ui:title": "Beskrivelse",
       "ui:help": "What the video is about expressed by a free choice of descriptive phrases or keywords.",
       "ui:widget": "textarea"
     },
     "descriptionWriter": {
        "ui:title": "Beskrivelse, forfatter",
       "ui:collapsible": true,
       "ui:help": "Navnet på personen som har skriver eller redigerer beskrivelsen av innholdet."       
     },

    "creditLine": {
        "ui:title": "Kreditering",
      "ui:help": "The Credit Line is a free-text field that specifies how to acknowledge the supplying person(s) and/or organization(s) when publishing the audio."
    },

    "category": {
        "ui:title": "Kategori",
      "ui:placeholder": "Velg kategori"
    },

     "keywords": {
       "ui:title": "Stikkord",
       "ui:help": "Stikkord, adskilt med komma.",
       "ui:widget": "textarea"
     },
     "volume": {
       "ui:title": "Volum",
       "ui:widget": "range",
       "ui:help": "Juster volum opp eller ned.",
     }
  },
  "metadata": {
    "ui:layout": "section",
    "ui:icon": "tag",
    "ui:title": "Metadata",

    "ui:fieldset": [
      "category",

      "director",
      "producer",
      "series",
      "season",
      "episode",

      "locationShot",
      "locationShown",

      "album",
      "artist",
      "composer",
      "copywriter",
      "releaseYear",

      "recordCompany",
      "catalogNumber"

    ],

    "title": {
      "ui:title": "Tittel",
      "ui:help": "Tittel på video, film, tv-program."
    },
    "director": {
      "ui:title": "Regissør"
    },
    "producer": {
      "ui:title": "Produsent"
    },
    "series": {
      "ui:title": "Serie",
      "ui:help": "Evt. serie videoen er en del av."
    },
    "season": {
      "ui:title": "Sesong",
      "ui:help": "Evt. sesong videoen er den del av.."
    },
    "episode": {
      "ui:title": "Episode",
      "ui:help": "Evt. episode av en serie eller sesong."
    },
    "locationShot": {
      "ui:title": "Steder spilt inn",
      "ui:widget": "textarea",
      "ui:help": "Steder hvor videon ble spilt inn."
    },
    "locationShown": {
      "ui:title": "Steder som vises",
      "ui:widget": "textarea",
      "ui:help": "Steder som vises i videoen."
    },
    "album": {
      "ui:title": "Albumtittel",
      "ui:help": "Tittel på albumet låten er utgitt på."
    },
    "artist": {
      "ui:title": "Artist"
    },
    "composer": {
      "ui:title": "Komponist"
    },
    "copywriter": {
      "ui:title": "Tekstforfatter",
    },
    "releaseYear": {
      "ui:title": "Utgivelsesår"
    },
    "recordCompany": {
      "ui:title": "Plateselskap",
      "ui:help": "Plateselskap og/eller label låten er utgitt på."
    },
    "catalogNumber": {
      "ui:title": "Katalognummer",
      "ui:help": "Plateselskapets katalognummer."
    },
  },
  "rights": {
    "ui:layout": "section",
    "ui:icon": "copyright",
    "ui:title": "Rettigheter",

    "ui:fieldset": [
      "creator",
      "creatorJobtitle",
      "creditLine",
      "copyrightNotice",
      "copyrightOwner"
    ],

    "creator": {
      "ui:help": "This field should contain your name or the name of the person who created the photograph. If it is not appropriate to add the name of the photographer (for example, the photographer's identity needs to be protected) use a company or organization name. Once saved, this field should not be changed by anyone."
    },
    "creatorJobtitle": {
      "ui:help": "This field should list the job title of the photographer. Examples might include: Staff Photographer, Freelance Photographer or Independent Commercial Photographer. Since this is a qualifier for the Creator field, you must also complete the Creator field."
    },
    "creatorContactInfo": {
      "ui:help": "This field should list the job title of the photographer. Examples might include: Staff Photographer, Freelance Photographer or Independent Commercial Photographer. Since this is a qualifier for the Creator field, you must also complete the Creator field."
    },
    "creditLine": {
      "ui:help": "The Credit Line is a free-text field that specifies how to acknowledge the supplying person(s) and/or organization(s) when publishing the image."
    },
    "copyrightNotice": {
      "ui:help": "The Copyright Notice should include any legal language required to claim intellectual property."
    },
    "copyrightOwner": {
      "ui:help": "This field can be used to indicate the owner or owners of the copyright in the licensed image by name and identifier. This serves to identify the rights holder/s for the image."
    }
  }
}
}