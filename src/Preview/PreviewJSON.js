import React from "react"

const Preview = ({formData = {}, formContext}) => {
    
    return (
        <div>
            {JSON.stringify(formData)}
        </div>
    )


}

export default Preview