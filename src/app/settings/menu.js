const objectTypes = [
    {
        pathname: "artwork",
        title: "Art",
        view: "icons",
        viewOptions: ["list","icons"],
        query: {
            models: "documents",
            documentType: "*",
        }
    },
    {
        pathname: "design",
        title: "Design",
        view: "icons",
        viewOptions: ["list","icons"],
        query: {
            models: "ekultur",
            documentType: "Artdesign",
        }
    },
    {
        pathname: "fineart",
        title: "Billedkunst",
        view: "icons",
        viewOptions: ["list","icons"],
        query: {
            models: "ekultur",
            documentType: "Fineart",
        }
    },
    {
        pathname: "architecture",
        title: "Arkitektur",
        view: "icons",
        viewOptions: ["list","icons"],
        query: {
            models: "ekultur",
            documentType: "Architecture",
        }
    },

]

const collectionTypes = [
    {
        pathname: "folder",
        title: "Mapper",
        view: "icons",
        viewOptions: ["list","icons"],
        query: {
            models: "ekultur",
            documentType: "Folder",
        }
    },
    {
        pathname: "exhibition",
        title: "Utstillinger",
        view: "icons",
        viewOptions: ["list","icons"],
        query: {
            models: "ekultur",
            documentType: "Exhibition",
        }
    },

]

const nameTypes = [
    {
        pathname: "people",
        title: "Personer",
        view: "icons",
        viewOptions: ["list","icons"],
        query: {
            models: "ekultur",
            documentType: "Person",
        }
    },
    {
        pathname: "org",
        title: "Organisasjoner",
        view: "icons",
        viewOptions: ["list","icons"],
        query: {
            models: "ekultur",
            documentType: "Organization",
        }
    },

]

export default [
    {
        pathname: "/",
        title: "Alt innhold",
        view: "icons",
        viewOptions: ["list","icons"],
        query: {
            models: "documents",
            documentType: "*",
        }
    },
    {
        title: "Objekter",
        pathname: "types",
        role: "section",
        children: objectTypes
    },
    {
        title: "Collections",
        pathname: "collections",
        role: "section",
        children: collectionTypes
    },
    {
        title: "Navn",
        pathname: "names",
        role: "section",
        children: nameTypes
    }
]