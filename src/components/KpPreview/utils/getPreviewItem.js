import Color from 'color';

export const getPreviewItem = (item) => {
    const { index, referenceId, reference, mediaId, media, grid, localeId, backgroundColor, color } = item;

//    const primaryColor = Color(backgroundColor)
//    const contrastColor = primaryColor.isLight() && "black" || "white"


    const imageUrl = media && media.imageUrl || referenceId && reference && reference.imageUrl;
    const runningHead = item.runningHead && item.runningHead[localeId];
    const title = item.title && item.title[localeId] || referenceId && reference && reference.title || "Untitled";
    const description = item.description && item.description[localeId];

    let itemType;

    if (referenceId) {
        itemType = "link"
    } else if (mediaId) {
        itemType = "media"
    }    

    // grid
    const m = grid && grid.split(':');
    const cols = m && m[0] || 1
    const rows = m && m[1] || 1

    // id
    const id = "root_content_body_links_" + index

    // colors

    return {
        ...item,
        id: id,
        itemType: itemType,
        imageUrl: imageUrl,
        runningHead: runningHead,
        title: title,
        description: description,
        cols: cols,
        rows: rows
    }
    
}