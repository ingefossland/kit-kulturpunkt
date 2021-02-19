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


export {
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