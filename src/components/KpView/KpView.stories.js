import React from 'react';
import KpView from "./KpView";

import search from "./search/page"

export default {
    title: 'App/View',
    component: KpView,
    args: {
        ...search,
        items: search.models
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