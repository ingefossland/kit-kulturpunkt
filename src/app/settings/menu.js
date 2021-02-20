const home = {
    url: "/",
    title: "Alt innhold",
    viewOptions: ["apps"],
    query: {
        fl: "uniqueId,id,title",
        rows: 0,
        models: "documents",
        status: "NOT trash",
    },
}

const favourites = [
    {
        url: "/kp",
        title: "KulturPunkt",
        icon: "kpMenu",
    },
    {
        url: "/kiosk",
        title: "Kiosk",
        icon: "kioskMenu",
    }
]

export default [
    home,

    {
        title: "Favoritter",
        pathname: "favourites",
        role: "section",
        children: favourites
    }

]