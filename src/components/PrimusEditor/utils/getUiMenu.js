import _ from 'lodash';
import { getUiFieldset } from "./"

import { utils } from "@rjsf/core";
const { getUiOptions, getDefaultFormState } = utils;

export const getUiMenu = (props) => {
    const { uiSchema, formContext } = props;
    const uiOptions = getUiOptions(uiSchema || {})

    const onExpand = formContext && formContext.onExpand

    const uiFieldset = getUiFieldset(props)

    let uiMenu = []

    if (uiFieldset) {

        uiMenu = uiFieldset.map(field => {

            const { name, idPrefix, uiSchema } = field

            const uiOptions = getUiOptions(uiSchema)

            return {
                id: idPrefix,
                name: name,
                icon: uiOptions['icon'] || undefined,
                label: uiOptions['title'] || name,
                selected: uiOptions.selected,
                onClick: () => onExpand({id: idPrefix})
            }


        })

    }

    if (!uiMenu.length) {
        return false
    }

    return uiMenu
    
}

export default getUiMenu