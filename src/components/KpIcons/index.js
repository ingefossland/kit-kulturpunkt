import React from "react"

import Article from "./Article"
import Object from "./Object"

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

import ImageFolder from "./ImageFolder"
import VideoFolder from "./VideoFolder"
import AudioFolder from "./AudioFolder"

import KioskApp from "./KioskApp"
import KioskMenu from "./KioskMenu"
import KioskEditor from "./KioskEditor"

import KpApp from "./KpApp"
import KpMenu from "./KpMenu"
import KpEditor from "./KpEditor"

export {
    KioskApp,
    KioskMenu,
    KioskEditor,

    KpApp,
    KpMenu,
    KpEditor,

    Article,
    Object,
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
    PageParent,

    ImageFolder,
    VideoFolder,
    AudioFolder
}

export default {

    "kpApp": <KpApp />,
    "kpEditor": <KpEditor />,
    "kpMenu": <KpMenu />,

    "kioskApp": <KioskApp />,
    "kioskEditor": <KioskEditor />,
    "kioskMenu": <KioskMenu />,

    "article": <Article />,
    "object": <Object />,

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
    "deviceWin": <DeviceWin />,

    "audioFolder": <AudioFolder />,
    "videoFolder": <VideoFolder />,
    "imageFolder": <ImageFolder />

}