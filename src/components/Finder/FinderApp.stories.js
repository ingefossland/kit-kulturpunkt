import React from 'react';
import FinderApp from './FinderApp';

export default {
    title: 'Finder/FinderApp',
    component: FinderApp,
    args: {
        app: {
            title: "Finder"
        },
        sidebar: {
            expanded: true
        },
        primaryAction: {
            label: "Create"
        },
        menu: [
            {
                label: "Menu 1"
            }
        ],
        calendar: {
            date: "1999-06-26"
        }
    },
    argTypes: {
    },
};

const Template = (args) => <FinderApp {...args} />

export const Default = Template.bind({});
Default.args = {
    children: <p>Content</p>
}