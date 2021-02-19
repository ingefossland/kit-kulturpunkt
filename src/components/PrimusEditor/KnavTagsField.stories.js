import React from 'react';
import PrimusEditor from "./PrimusEditor";
import KnavTagsField from "./KnavTagsField";

export default {
    title: 'uiFields/KnavTagsField',
    component: KnavTagsField,
    args: {
        schema: {
            "type": "object",
            "properties": {
                "value": {
                    "type": "string"
                },
                "label": {
                    "type": "string"
                }
            }
        },
        uiSchema: {
            "ui:field": KnavTagsField
        }
    },
    argTypes: {
    },
};

const Template = (args) => <PrimusEditor {...args} />

export const Default = Template.bind({});
Default.args = {
}

export const PeopleSearch = Template.bind({});
PeopleSearch.args = {
    "uiSchema": {
        "ui:field": KnavTagsField,
        "ui:title": "Person",
        "ui:icon": "person",
        "ui:locale": "no",
        "ui:query": {
            "entityType": "Person"
        }
    }
}

export const PlaceSearch = Template.bind({});
PlaceSearch.args = {
    "uiSchema": {
        "ui:field": KnavTagsField,
        "ui:title": "Place",
        "ui:locale": "no",
        "ui:query": {
            "entityType": "Place"
        }
    }
}


export const Designation = Template.bind({});
Designation.args = {
    "uiSchema": {
        "ui:field": KnavTagsField,
        "ui:title": "Betegnelse",
        "ui:locale": "no",
        "ui:query": {
            "entity.dataset": "a05e6cbb-26db-4861-a9fe-68857c2e707d"
        }
    }
}

export const EventTypeSearch = Template.bind({});
EventTypeSearch.args = {
    "uiSchema": {
        "ui:field": KnavTagsField,
        "ui:title": "Hendelsestype",
        "ui:locale": "no",
        "ui:query": {
            "entity.dataset": "4118813d-3fd0-4db0-9d84-0b8040d3e23f"
        }
    }
}

export const ClassificationOutline = Template.bind({});
ClassificationOutline.args = {
    "uiSchema": {
        "ui:field": KnavTagsField,
        "ui:title": "Klassifikasjon",
        "ui:locale": "no",
        "ui:query": {
            "entity.dataset": "a8797483-ff02-4a4c-adf1-b406cbcd6fc2"
        }
    }
}