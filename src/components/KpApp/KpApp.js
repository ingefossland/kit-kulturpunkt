import React, { useRef, useEffect, useState } from "react"
import { AppLayout } from "../App"
import { FinderLayout, FinderSection } from "../Finder"

import icons from "../KpIcons/"

import KpView from "./KpView"

const KpApp = ({app = {}, section = {}}) => {

    // preview

    const header = {
        title: app.title || "Kp",
        subtitle: app.subtitle || "Owner",
        sidebar: app.sidebar,
        search: app.search
    }

    const finder = {
        primaryAction: app.primaryAction,
        menu: app.menu,
    }

    const info = {
        title: app.title,
        version: "1.0.1"
    }

    const theme = app.theme || {
        palette: {
            primary: {
                main: "#f00"
            }
        }
    }

    const [view, setView] = useState(section.view && section.view || "list")

    const _onView = (view) => {
        setView(view)
    }

    return (
        <AppLayout
            theme={theme}
            header={header}>
            <FinderLayout {...finder} info={info} icons={icons}>
                <FinderSection>
                    <KpView {...section} view={view} onView={_onView} />
                </FinderSection>
            </FinderLayout>
        </AppLayout>
    )

}

export default KpApp;