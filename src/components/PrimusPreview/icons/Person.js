import React from "react"
import Male from "./Male"
import Female from "./Female"

const Person = ({gender = "male", ...props}) => {

    if (gender === "female") {
        return (
            <Female {...props} />
        )
    } else {
        return (
            <Male {...props} />
        )
    }

}

export default Person