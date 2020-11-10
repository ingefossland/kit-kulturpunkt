import React from "react"
import ArrayBase from "./ArrayBase"
import ArrayHeader from "./ArrayHeader"
import ArrayBody from "./ArrayBody"
import ArrayFooter from "./ArrayFooter"
import ArrayButtons from "./ArrayButtons"

const ArrayLayout = ({buttons = [], children, ...props}) => {

    return (
        <ArrayBase>
            <ArrayHeader {...props} />
            { children && <ArrayBody>{children}</ArrayBody> }
            <ArrayFooter>
                <ArrayButtons buttons={buttons} />
            </ArrayFooter>
        </ArrayBase>
    )

}

export default ArrayLayout