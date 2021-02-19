import React from 'react';
import { GridView, GridModule } from "../components/PrimusView"

import FinderModel from "./FinderModel"

const FinderViewGrid = ({ resultsLoaded, prevPage, nextPage, onPage }) => {

    return (
        <GridView>
            { prevPage && <GridModule placeholder title="Prev page" onClick={() => onPage(prevPage)} />}
            { resultsLoaded && resultsLoaded.map((model, index) => {
                return (
                    <FinderModel {...model} key={index}>
                        <GridModule />
                    </FinderModel>
                )
            })}
            { nextPage && <GridModule placeholder title="Next page" onClick={() => onPage(nextPage)} />}
        </GridView>
    )

}

export default FinderViewGrid