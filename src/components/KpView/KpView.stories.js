import React from 'react';
import KpView from "./KpView";

import search from "./search/pageMap"

export default {
    title: 'App/View',
    component: KpView,
    args: {
        ...search
    },
    argTypes: {
    },
};

const Template = (args) => <KpView {...args} />

export const KulturPunkt = Template.bind({});
KulturPunkt.args = {
}


export const Kiosk = Template.bind({});
Kiosk.args = {
}