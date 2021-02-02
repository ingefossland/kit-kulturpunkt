import React from "react"
import NavSearch from "../NavSearch/NavSearch"

const KpEditorDialog = (props) => {

    const { expanded, schema = {}, uiSchema = {}, formData = {}, formContext, onChange, onClose } = props

    if (!expanded) {
        return false
    }

    const _addImage = () => {
        onChange && onChange({
            mediaId: 1,
            media: {
                mediaType: "image",
                imageUrl: "https://akamai.vgc.no/drfront/images/2020/09/22/c=144,24,404,232;w=362;h=208;557008.jpg"
            }
        })
    }

    return (
        <div>
            <NavSearch />
            {JSON.stringify(schema)}
            {JSON.stringify(formData)}

            <button onClick={() => _addImage()}>Add img</button>

            <button onClick={() => onClose()}>Close</button>

        </div>
    )


}

export default KpEditorDialog