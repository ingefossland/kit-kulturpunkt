import mediaSchemas from "@kit-ui/schema/es/Media/schemas"
//import primusSchemas from "../../components/PrimusEditor/schemas"
import kpSchemas from "../../components/KpEditor/schemas"

const schemas = [
    ...mediaSchemas,
//    ...primusSchemas,
    ...kpSchemas,
]

let schemasByName = {}

schemas.map(schema => {
    const { schemaType, name } = schema

    const schemaName = schemaType + "/" + name

    if (schemaType && name) {
        schemasByName[schemaType + "/" + name] = schema
    }
})

export {
    schemas,
    schemasByName
}

export default schemasByName