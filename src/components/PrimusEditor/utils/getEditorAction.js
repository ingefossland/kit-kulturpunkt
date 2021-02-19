// primary action

export const getEditorAction = ({t, formData, formContext}) => {

    const { isLoading, isSaving, onSubmit, preview, onTogglePreview } = formContext
    const { uniqueId } = formData

    if (preview && preview.expanded) {
        return {
            type: "edit",
            onClick: onTogglePreview
        }

    }

    if (isLoading) {
        return {
            label: t("Loading") + " ...",
            disabled: true
        }
    } else if (isSaving) {
        return {
            label: t("Saving") + " ...",
            disabled: true
        }
    }

    let primary = {
        role: "group",
        children: [
            {
                label: t("Save as draft"),
                onClick: (event) => onSubmit({formData: {...formData, status: "draft"}}, event),
            },
            {
                label: t("Save and publish"),
                onClick: (event) => onSubmit({formData: {...formData, status: "publish"}}, event),
            },
        ]
    }

    let secondary = {
        role: "group",
        children: [
            {
                label: t("Save and exit"),
            }
        ]

    }

    if (uniqueId) {
        secondary.children.push({
            label: t("Save as") + " ...",
            onClick: (event) =>  onSubmit({formData: {...formData, status: "copy"}}, event),
        })
    }
    

    return {
        type: "save",
        label: t("Save"),
        onClick: (event) => onSubmit({formData}, event),
        children: [
            primary,
            secondary
        ]
    }

}