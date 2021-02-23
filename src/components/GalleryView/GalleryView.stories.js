import React from 'react';
import ViewBase from "../View/ViewBase"
import ViewHeader from "../View/ViewHeader"

import GalleryView from "./GalleryView";
import GalleryModule from "./GalleryModule";

import pages from "./data/pages"
import media from "./data/media"
import icons from "../KpIcons"

export default {
    title: 'Views/GalleryView',
    component: GalleryView,
    args: {
        items: pages.models,
        selectable: true,
        editable: true,
        deletable: true,
        restorable: true,
        erasable: true,
    },
    argTypes: {
        mediaSize: {
            control: {
                type: 'range',
                min: 100,
                max: 1000
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

const Template = ({mediaSize, items, ...args}) => (
    <ViewBase>
        <ViewHeader parents={[{title: "Parent"}]} title="Gallery" />

        <GalleryView mediaSize={mediaSize}>
            { items.map((item, index) => {

                item.icons = icons

                if (index === 2) {
                    return <GalleryModule {...item} {...args} title="Selected" selected={true} key={index} />
                }

                if (index === 3) {
                    return <GalleryModule {...item} {...args} status="trash" title="Deleted" deleted={true} key={index} />
                }

                if (index === 4) {
                    return <GalleryModule {...item} {...args} status="erased" title="Erased" erased={true} key={index} />
                }

                return <GalleryModule {...item} {...args} key={index} />

            })}
        </GalleryView>
    </ViewBase>
)

export const Default = Template.bind({});
Default.args = {
}

export const Media = Template.bind({});
Media.args = {
    items: media.models
}
