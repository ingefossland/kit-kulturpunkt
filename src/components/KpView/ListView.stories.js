import React from 'react';
import ViewBase from "./ViewBase"
import ViewHeader from "./ViewHeader"

import ListView from "./ListView";
import ListModule from "./ListModule";

import pages from "./data/pages"
import media from "./data/media"
import icons from "../KpIcons"

const sizeOptions = ["small","medium","large"]

export default {
    title: 'Views/ListView',
    component: ListView,
    args: {
        size: "medium",
        items: pages.models,
        selectable: true,
        editable: true,
        deletable: true,
        restorable: true,
        erasable: true,
    },
    argTypes: {
        size: {
            control: {
                type: 'radio',
                options: sizeOptions
            }
        },
        selectable: {
            control: {
                type: 'boolean'
            }
        },
        selected: {
            control: {
                type: 'boolean'
            }
        },
        editable: {
            control: {
                type: 'boolean'
            }
        },
        deletable: {
            control: {
                type: 'boolean'
            }
        },
        deleted: {
            control: {
                type: 'boolean'
            }
        },
        restorable: {
            control: {
                type: 'boolean'
            }
        },
        erasable: {
            control: {
                type: 'boolean'
            }
        }
    },
};

const Template = ({size, items, ...args}) => (
    <ViewBase>
        <ViewHeader parents={[{title: "Parent"}]} title="List" />

        <ListView>
            { items.map((item, index) => {

                item.icons = icons
                item.size = size

                if (index === 2) {
                    return <ListModule {...item} {...args} title="Selected" selected={true} key={index} />
                }

                if (index === 3) {
                    return <ListModule {...item} {...args} status="trash" title="Deleted" deleted={true} key={index} />
                }

                if (index === 4) {
                    return <ListModule {...item} {...args} status="erased" title="Erased" erased={true} key={index} />
                }

                return <ListModule {...item} {...args} key={index} />

            })}
        </ListView>
    </ViewBase>
)

export const Default = Template.bind({});
Default.args = {
}

export const SizeSmall = Template.bind({});
SizeSmall.args = {
    size: "small"
}

export const Media = Template.bind({});
Media.args = {
    items: media.models
}
