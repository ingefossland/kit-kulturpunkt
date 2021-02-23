import React from 'react';
import { IconsView, IconsModule } from "../components"
import { useTranslation } from 'react-i18next';

import FinderModel from "./FinderModel"

const FinderViewIcons = ({size, resultsLoaded, prevPage, nextPage, onPage }) => {

    const { t } = useTranslation("search")

    const iconSize = 24 + size * 1

    const prevPageLabel = t("Page {{page}}", {page: prevPage})
    const nextPageLabel = t("Page {{page}}", {page: nextPage})

    const header = prevPage && <IconsModule icon="arrow_back" iconSize={iconSize} placeholder title={prevPageLabel} onClick={() => onPage(prevPage)} />
    const footer = nextPage && <IconsModule icon="arrow_forward" iconSize={iconSize} placeholder title={nextPageLabel} onClick={() => onPage(nextPage)} />

    return (
        <IconsView header={header} footer={footer} iconSize={iconSize}>
            { resultsLoaded && resultsLoaded.map((model, index) => {
                return (
                    <FinderModel {...model} iconSize={iconSize} key={index}>
                        <IconsModule />
                    </FinderModel>
                )
            })}
        </IconsView>
    )

}

export default FinderViewIcons