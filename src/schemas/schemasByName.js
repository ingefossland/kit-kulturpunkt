import mediaSchemas from "@kit-ui/schema/es/Media/schemas"
import schemas from "./"

let schemasByName = {
}

const allSchemas = [
    ...mediaSchemas,
    ...schemas
]

allSchemas.map(schema => {
    const { schemaType, name } = schema

    if (schemaType && name) {
        schemasByName[schemaType + "/" + name] = schema
    }
})

export default schemasByName