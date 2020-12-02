import { shape, bool, number, string } from "prop-types"

export default {
    /** Expanded? */
    expanded: bool,
    elevation: number,
    color: string,
    title: string,
    subtitle: string,
    search: shape({
        expanded: bool,
        placeholder: string
    }),
    subview: shape({
        expanded: bool,
        title: string,
        subtitle: string
    })
}