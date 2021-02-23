import React from 'react';
import ViewBase from "../View/ViewBase"
import ViewHeader from "../View/ViewHeader"

import TableView from "./TableView";
import TableModule from "./TableModule";

import pages from "./data/pages"
import media from "./data/media"
import icons from "../KpIcons"

export default {
    title: 'Views/TableView',
    component: TableView,
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
        <ViewHeader parents={[{title: "Parent"}]} title="Table" />

        <TableView columnSize={columnSize}>
            { items.map((item, index) => {

                item.icons = icons

                if (index === 2) {
                    return <TableModule {...item} {...args} selected={true} key={index} />
                }

                if (index === 3) {
                    return <TableModule {...item} {...args} status="trash" deleted={true} key={index} />
                }

                if (index === 4) {
                    return <TableModule {...item} {...args} status="erased" erased={true} key={index} />
                }

                return <TableModule {...item} {...args} key={index} />

            })}
        </TableView>
    </ViewBase>
)

export const Default = Template.bind({});
Default.args = {
}

export const Media = Template.bind({});
Media.args = {
    items: media.models
}
