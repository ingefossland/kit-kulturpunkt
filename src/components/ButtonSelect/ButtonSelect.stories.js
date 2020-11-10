import React from 'react';
import ButtonSelect from './ButtonSelect';

export default {
    title: 'Buttons/ButtonSelect',
    component: ButtonSelect,
    args: {
    },
    argTypes: {
    },
    
};

const Template = (args) => <ButtonSelect {...args} />;

export const Default = Template.bind({});
Default.args = {
}

export const Selected = Template.bind({});
Selected.args = {
    selected: true
}