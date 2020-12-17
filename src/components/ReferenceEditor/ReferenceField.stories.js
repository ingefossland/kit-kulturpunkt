import React from 'react';
import ReferenceField from "./ReferenceField"
import Schema from "../SchemaEditor";

export default {
    title: 'Fields/ReferenceField',
    component: ReferenceField,
    args: {
    },
    argTypes: {
    },
};

const Template = (args) => <Schema {...args} />

export const Default = Template.bind({});
Default.args = {
    schema: {
        type: "reference",
    }
}

export const DocumentType = Template.bind({});
DocumentType.args = {
    schema: {
        type: "reference",
        documentType: "article"
    },
    formData: {
        referenceId: "1",
        reference: {
            title: "Referanse 1"
        }
    }
}


export const WithContent = Template.bind({});
WithContent.args = {
    schema: {
        type: "reference",
        documentType: "article",
        content: {
            properties: {
                title: {
                    "type": "string"
                }
            }
        }
    },
    formData: {
        referenceId: "1",
        reference: {
            title: "Referanse 1"
        }
    }
}

export const WithProperties = Template.bind({});
WithProperties.args = {
    schema: {
        type: "reference",
        documentType: "article",
        content: {
            properties: {
                title: {
                    "type": "string"
                }
            }
        },
        properties: {
            custom: {
                type: "object",
                properties: {
                    title: {
                        "type": "string"
                    },
                    description: {
                        "type": "string"
                    }
                }
            }
        }
    },
    formData: {
        referenceId: "1",
        reference: {
            title: "Referanse 1"
        }
    }
}

export const ReferenceType = Template.bind({});
ReferenceType.args = {
    schema: {
        type: "reference",
        documentType: "article",
        referenceType: "pageHasArticles",
        formData: {
            referenceId: "1",
            reference: {
                title: "Referanse 1"
            }
        }
    }
}

export const ReferenceArray = Template.bind({});
ReferenceArray.args = {
    schema: {
        type: "object",
        properties: {
            "array": {
                type: "array",
                items: {
                    type: "reference",
                    documentType: "article",
                    referenceType: "pageHasArticles",
                }
            }
        }
    },
    uiSchema: {
        "ui:field": "pageEditor",
        "ui:fieldset": [
            "content"
        ],
        "content": {
            "ui:field": "pageContent",
            "ui:fieldset": ["array"],
    
            "array": {
                "ui:sortable": true,
                "ui:dialog": true,
                "items": {
                    "ui:layout": "module",
                    "ui:editable": true,
                }
            }
        }
    },

    formData: {
        array: [
            {
                referenceId: "1",
                reference: {
                    title: "Referanse 1"
                }
            }
        ]
    }
}
