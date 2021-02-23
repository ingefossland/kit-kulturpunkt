import React from 'react';
import KpEditor from "./KpEditor";
import schemasByName from "./schemas/schemasByName"

export default {
    title: 'Kp/Editor',
    component: KpEditor,
    args: {
        "formData": {
            "title": "Tittel",
            "content": {
                "title": "Tittel",
            }
        },
        "formContext": {
            "parents": [
                {
                    "title": "Kp",
                }
            ]
        }
    },
    argTypes: {
    },
};

const Template = (args) => <KpEditor {...args} />

export const Article = Template.bind({});
Article.args = {
    ...schemasByName["documents/article"]
}

export const Device = Template.bind({});
Device.args = {
    ...schemasByName["documents/device"]
}

export const Page = Template.bind({});
Page.args = {
    ...schemasByName["documents/page"]
}

export const PageHome = Template.bind({});
PageHome.args = {
    ...schemasByName["documents/pageHome"]
}

export const PageTopic = Template.bind({});
PageTopic.args = {
    ...schemasByName["documents/pageTopic"]
}

export const PageMap = Template.bind({});
PageMap.args = {
    ...schemasByName["documents/pageMap"]
}

export const PageAnnotate = Template.bind({});
PageAnnotate.args = {
    ...schemasByName["documents/pageAnnotate"]
}

export const PageGrid = Template.bind({});
PageGrid.args = {
    ...schemasByName["documents/pageGrid"]
}

export const PageList = Template.bind({});
PageList.args = {
    ...schemasByName["documents/pageList"]
}

export const PageTimeline = Template.bind({});
PageTimeline.args = {
    ...schemasByName["documents/pageTimeline"]
}

export const PageMedia = Template.bind({});
PageMedia.args = {
    ...schemasByName["documents/pageMedia"]
}