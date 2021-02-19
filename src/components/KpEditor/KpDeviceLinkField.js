import React from 'react';
import { ModuleLabel } from "../Module"
import ButtonBase from "@material-ui/core/ButtonBase"

const KpDeviceLinkField = (props) => {

    const {
        formData,
        formContext,
    } = props


    const { startPageId, setStartPageId } = formContext
    const { referenceId, reference } = formData

    const isStartPage = startPageId && referenceId === startPageId

    const toggleStartPage = (id) => {
        setStartPageId && setStartPageId(id)
    }


    const StartPageSettings = () => {

        if (isStartPage) {
            return (
                <ButtonBase onClick={() => toggleStartPage(undefined)}>
                    <ModuleLabel backgroundColor="black">Startpage</ModuleLabel>
                </ButtonBase>
            )
        }

        return (
            <ButtonBase onClick={() => toggleStartPage(referenceId)}>
                <ModuleLabel>Startpage</ModuleLabel>
            </ButtonBase>
        )
    }

    const settings = [
        StartPageSettings
    ]

    const uiSchema = {
        ...props.uiSchema,
        "ui:documentType": reference && reference.documentType,
        "ui:imageUrl": reference && reference.imageUrl,
        "ui:title": reference && reference.title,
        "ui:layout": "kpLink"
    }

    const { ObjectField } = props.registry.fields

    return (
        <ObjectField {...props} uiSchema={uiSchema} />
    )

}

export default KpDeviceLinkField;
