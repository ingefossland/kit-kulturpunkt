import React from "react"

import Article from "./Article"

import Device from "./Device"
import DeviceMac from "./DeviceMac"
import DeviceWin from "./DeviceWin"

import PageHome from "./PageHome"
import PageGrid from "./PageGrid"
import PageMedia from "./PageMedia"
import PageTimeline from "./PageTimeline"
import PageList from "./PageList"
import PageAnnotate from "./PageAnnotate"
import PageMap from "./PageMap"
import PageParent from "./PageParent"

import KioskApp from "./KioskApp"
import KioskMenu from "./KioskMenu"

import KpApp from "./KpApp"
import KpMenu from "./KpMenu"


export {

    KioskApp,
    KioskMenu,
    KpApp,
    KpMenu,

    Article,
    Device,
    DeviceMac,
    DeviceWin,

    PageHome,
    PageGrid,
    PageMedia,
    PageTimeline,
    PageList,
    PageAnnotate,
    PageMap,
    PageParent
}

export default {
    "kpApp": <KpApp />,
    "kpMenu": <KpMenu />,

    "kioskApp": <KioskApp />,
    "kioskMenu": <KioskMenu />,

    "article": <Article />,

    "pageHome": <PageHome />,
    "pageGrid": <PageGrid />,
    "pageMap": <PageMap />,

    "pageMedia": <PageMedia />,
    "pageAnnotate": <PageAnnotate />,
    "pageTimeline": <PageTimeline />,
    "pageList": <PageList />,
    "pageParent": <PageParent />,
    "pageTopic": <PageParent />,

    "device": <Device />,
    "deviceMac": <DeviceMac />,
    "deviceWin": <DeviceWin />

}