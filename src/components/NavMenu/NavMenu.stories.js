import React from 'react';
import NavMenu from './NavMenu';

export default {
  title: 'Navigation/NavMenu',
  component: NavMenu,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

const Template = (args) => <NavMenu {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    currentUrl: "/parent/2",
    menuByUrl: {
        "/home": {
            count: 20
        },
        "/group": {
            count: 200
        }
    },
  menu: [
    {
        role: "group",
        icon: 'homepage',
        label: 'A very long title that should be cut',
        url: '/home',
    },
    {
        role: "group",
        icon: 'event',
        label: 'Calendar',
        url: '/calendar',
        calendar: true
    },
    {
        role: "group",
        icon: 'view_quilt',
        label: "group",
        url: "/group",
        children: [
            {
                label: 'Section 2a',
                url: '/group/1',
            },
            {
                label: 'Section 2b',
                url: '/group/2',
            },
            {
                label: 'Section 2c',
                url: '/group/3',
            },
        ]
    },
    {
        role: "group",
        hidden: true,
        children: [
            {
                icon: 'view_quilt',
                label: 'Section 2a',
                url: '/section/1',
            },
            {
                icon: 'view_stream',
                label: 'Section 2b',
                url: '/section/2',
            },
            {
                icon: 'view_headline',
                label: 'Section 2c',
                url: '/section/3',
            },
        ],
    },
    {
        role: "group",
        icon: 'image',
        label: 'Parent',
        url: '/parent',
        children: [
            {
                label: 'Child 1',
                url: '/parent/1',
            },
            {
                label: 'Child 2',
                url: '/parent/2',
                expanded: true,
                children: [
                    {
                        label: 'Grandchild 1',
                        url: '/parent/2/1',
                    },
                    {
                        label: 'Grandchild 2',
                        url: '/parent/2/2',
                    },
                ]
            }
        ]
    },
    {
        icon: 'image',
        label: 'Expanded',
        url: '/expanded/',
        expanded: true,
        role: "group",
        children: [
            {
                label: 'Child A',
                url: '/expanded/a/',
            },
            {
                label: 'Child B',
                url: '/expanded/b/',
                children: [
                    {
                        label: 'Grandchild 1',
                        url: '/expanded/b/grandchild-1/',
                    },
                    {
                        label: 'Grandchild 2',
                        url: '/expanded/b/grandchild-2/',
                    },
                ]
            }
        ]
    },
    {
        label: 'Section A',
        url: '/section/a',
    },
    {
        label: 'Section B',
        url: '/section/b',
    },
    {
        label: 'Section C',
        url: '/section/c',
    },
],
  label: 'Button',
};