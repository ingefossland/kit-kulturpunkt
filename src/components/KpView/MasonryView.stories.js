import React from 'react';
import ViewBase from "./ViewBase"
import ViewHeader from "./ViewHeader"

import MasonryView from "./MasonryView";
import MasonryModule from "./MasonryModule";

import pages from "./data/pages"
import media from "./data/media"

export default {
    title: 'Views/MasonryView',
    component: MasonryView,
    args: {
        items: pages.models,
        selectable: true,
        editable: true,
        deletable: true,
        restorable: true,
        erasable: true,
    },
    argTypes: {
        columnSize: {
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

const Template = ({columnSize, items, ...args}) => (
    <ViewBase>
        <ViewHeader parents={[{title: "Parent"}]} title="Masonry" />

        <MasonryView columnSize={columnSize}>
            { items.map((item, index) => {

                if (index === 2) {
                    return <MasonryModule {...item} {...args} title="Selected" selected={true} key={index} />
                }

                if (index === 3) {
                    return <MasonryModule {...item} {...args} status="trash" title="Deleted" deleted={true} key={index} />
                }

                if (index === 4) {
                    return <MasonryModule {...item} {...args} status="erased" title="Erased" erased={true} key={index} />
                }

                return <MasonryModule {...item} {...args} key={index} />

            })}
        </MasonryView>
    </ViewBase>
)

export const Default = Template.bind({});
Default.args = {
}

export const Media = Template.bind({});
Media.args = {
    items: media.models
}
