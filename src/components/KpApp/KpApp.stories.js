import React from 'react';
import KpApp from "./KpApp";

import kpSettings from "../../app/settings/kp"
import kioskSettings from "../../app/settings/kiosk"

import tree from "./data/tree"

export default {
    title: 'Kp/Finder',
    component: KpApp,
    args: {
    },
    argTypes: {
    },
};

const Template = (args) => <KpApp {...args} />

export const KulturPunkt = Template.bind({});
KulturPunkt.args = {
    app: kpSettings,
    section: {
        view: "tree",
        viewOptions: ["tree","cols"],
        items: tree.models
    }
}


export const KioskApp = Template.bind({});
KioskApp.args = {
    app: kioskSettings,
    section: {
        view: "list",
        viewOptions: ["list","icons"],
        items: tree.models
    }
}