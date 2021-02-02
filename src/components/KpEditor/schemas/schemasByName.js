import schemas from "./"

let schemasByName = {
}


schemas.map(schema => {
    const { schemaType, name } = schema

    if (schemaType && name) {
        schemasByName[schemaType + "/" + name] = schema
    }
})

export default schemasByName