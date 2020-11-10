import React from 'react';
import Masonry from './Masonry';

export default {
    title: 'Layout/Masonry',
    component: Masonry,
    args: {
    },
    argTypes: {
    },
    
};

const Template = (args) => <Masonry {...args}>
    <img src="https://w3bits.com/files/img/cherry-plant.jpg" />
        <img src="https://w3bits.com/files/img/blueberries.jpg" />
        <img src="https://w3bits.com/files/img/cherry-plant.jpg" />
        <img src="https://w3bits.com/files/img/blueberries.jpg" />
        <img src="https://w3bits.com/files/img/cherry-plant.jpg" />
        <img src="https://w3bits.com/files/img/blueberries.jpg" />
        <img src="https://w3bits.com/files/img/cherry-plant.jpg" />
        <img src="https://w3bits.com/files/img/blueberries.jpg" />
        <img src="https://w3bits.com/files/img/cherry-plant.jpg" />
        <img src="https://w3bits.com/files/img/blueberries.jpg" />
</Masonry>;

export const Default = Template.bind({});
Default.args = {
}

export const TwoColumns = Template.bind({});
TwoColumns.args = {
    columns: 2
}

export const ThreeColumns = Template.bind({});
ThreeColumns.args = {
    columns: 3
}

export const FourColumns = Template.bind({});
FourColumns.args = {
    columns: 4
}