import React from "react"

import AppBase from "../App/AppBase"
import AppHeader from "../App/AppHeader"
import AppBody from "../App/AppBody"
import FinderSidebar from "./FinderSidebar"
import FinderContent from "./FinderContent"

const EditorAppExample = ({app}) => {

    return (
        <AppBase>
            <AppHeader />
            <AppBody>
                <FinderSidebar expanded={true}>
                    #FinderSidebar
                </FinderSidebar>
                <FinderContent>
                    #FinderContent
                </FinderContent>
            </AppBody>
        </AppBase>
    )

}