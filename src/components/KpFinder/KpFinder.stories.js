import React from 'react';
import KpFinder from "./KpFinder";

import kpSettings from "./kp"
import kioskSettings from "./kiosk"

import results from "../KpView/search/page"

export default {
    title: 'App/Finder',
    component: KpFinder,
    args: {
        results: results
    },
    argTypes: {
    },
};

const Template = (args) => <KpFinder {...args} />

export const KulturPunkt = Template.bind({});
KulturPunkt.args = {
    app: kpSettings
}


export const Kiosk = Template.bind({});
Kiosk.args = {
    app: kioskSettings
}