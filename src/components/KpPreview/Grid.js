import React from "react"
import { makeStyles } from '@material-ui/core/styles';
import PageHeader from "./PageHeader"
import KioskMosaicModule from "./GridModule"
import { getPreviewItem } from "./utils"

import PreviewFormat from "./PreviewFormat"

const useStyles = makeStyles(theme => ({
    root: {
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
    },
    body: {
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        margin: "5.5em 3.5em 1.5em 3.5em",
    },
    grid: {
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        display: "grid",
        gridTemplateColumns: props => { return props.templateCols },
        gridTemplateRows: props => { return props.templateRows },
        gridColumnGap: props => { return props.colGap },
        gridRowGap: props => { return props.rowGap },
    },
    gridItem: {
        gridColumnStart: "auto",
        gridColumnEnd: props => { return props.colEnd },
        gridRowStart: "auto",
        gridRowEnd: props => { return props.rowEnd },
        position: "relative",
        margin: ".5em"
    }
}));

const MosaicGrid = ({localeId, items, cols = 5, rows = 3, onCurrentId}) => {

    const colWidth = (100/cols);
    const rowHeight = (100/rows);

    const classes = useStyles({
        templateCols: (colWidth + "% ").repeat(cols),
        templateRows: (rowHeight + "% ").repeat(rows),
    })

    const GridItem = ({id, cols, rows, index, ...item}) => {

        const classes = useStyles({
            colEnd: "span " + cols,
            rowEnd: "span " + rows
        })
        
        return (
            <div className={classes.gridItem}>
                <KioskMosaicModule {...item} onClick={() => onCurrentId(id)} />
            </div>
        )
    
    }
    
    return (
        <div className={classes.grid}>
            { items && items.map((item, index) => {
                const itemProps = getPreviewItem({...item, index: index, localeId: localeId})
                return (
                    <GridItem {...itemProps} key={index} />
                )
            })}
        </div>
    )

}

const PreviewGrid = ({formData, formContext, width, height}) => {
    const { title, links, backgroundImage } = formData.content;
    const locale = formContext && formContext.currentLocale || formContext && formContext.defaultLocale;
    const localeId = "locale:"+locale
    const pageTitle = title && title[localeId] || formData.title

    const onCurrentId = formContext.onCurrentId

    const classes = useStyles()

    return (
        <PreviewFormat format="16:9">
            <div className={classes.root}>
                <PageHeader title={pageTitle} />
                <div className={classes.body}>
                    <MosaicGrid localeId={localeId} items={links} width={width} height={height} onCurrentId={onCurrentId} />
                </div>
            </div>
        </PreviewFormat>
    )

}

export default PreviewGrid