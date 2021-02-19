import React, { useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux';

import { FinderBase, FinderSidebar, FinderSection } from "../components/Finder"

const PrimusEditor = () => {

    const dispatch = useDispatch()

    const finder = useSelector(state => state.finder)

    return (
        <FinderBase>
            <FinderSidebar>sidebar</FinderSidebar>
            <FinderSection>
                view
            </FinderSection>
            <FinderSection>
                preview
            </FinderSection>
            <FinderSection>
                editor
            </FinderSection>
        </FinderBase>
    )

}

export default PrimusEditor