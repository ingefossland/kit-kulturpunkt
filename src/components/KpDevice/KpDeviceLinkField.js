import React from 'react';
import { ListModule, ExpandedModule, ModuleLabel } from "@kit-ui/admin"
import ButtonBase from "@material-ui/core/ButtonBase"

const KpDeviceLinkField = ({
    formData,
    formContext,
    children,
    ...props
}) => {

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

    if (props.editable && props.expanded) {
        return (
            <ExpandedModule {...props}>
                {children}
            </ExpandedModule>
        )
    }

    return (
        <ListModule
            {...reference}
            onEdit={undefined}
            elevation={1}
            settings={settings}
        />
    )

}

export default KpDeviceLinkField;
