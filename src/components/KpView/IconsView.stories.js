import React from 'react';
import ViewBase from "./ViewBase"
import ViewHeader from "./ViewHeader"

import IconsView from "./IconsView";
import IconsModule from "./IconsModule";

import pages from "./data/pages"
import media from "./data/media"
import icons from "../KpIcons"

export default {
    title: 'Views/IconsView',
    component: IconsView,
    args: {
        items: pages.models,
        selectable: true,
        editable: true,
        deletable: true,
        restorable: true,
        erasable: true,
    },
    argTypes: {
        iconSize: {
            control: {
                type: 'range',
                min: 24,
                max: 200
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

const Template = ({iconSize, items, ...args}) => (
    <ViewBase>
        <ViewHeader parents={[{title: "Parent"}]} title="Icons" />

        <IconsView iconSize={iconSize}>
            { items.map((item, index) => {

                item.icons = icons
                item.iconSize = iconSize

                if (index === 2) {
                    return <IconsModule {...item} {...args} title="Selected" selected={true} key={index} />
                }

                if (index === 3) {
                    return <IconsModule {...item} {...args} status="trash" title="Deleted" deleted={true} key={index} />
                }

                if (index === 4) {
                    return <IconsModule {...item} {...args} status="erased" title="Erased" erased={true} key={index} />
                }

                return <IconsModule {...item} {...args} key={index} />

            })}
        </IconsView>
    </ViewBase>
)

export const Default = Template.bind({});
Default.args = {
}

export const Media = Template.bind({});
Media.args = {
    items: media.models
}
