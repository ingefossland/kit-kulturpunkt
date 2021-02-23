const calculateCutOff = ({rowWidth, delta, row = []}) => {
    let cutoff = [];
    let cutsum = 0;

    for(var i in row) {
        var item = row[i];
        var fractOfLen = item.width / rowWidth;

        cutoff[i] = Math.floor(fractOfLen * delta);
        cutsum += cutoff[i];
    }

    var stillToCutOff = delta - cutsum;
    while(stillToCutOff > 0) {
        for(i in cutoff) {
            cutoff[i]++;
            stillToCutOff--;
            if (stillToCutOff < 0) break;
        }
    }

    return cutoff;

}

const getGalleryRow = ({maxWidth, gap, items = []}) => {
    const rowPlusGap = maxWidth + gap;

    var row = [];
    var rowWidth = 0;

    while (items.length > 0 && rowWidth < rowPlusGap) {
        let item = items.shift();
        row.push(item);
        rowWidth += (item.width + gap);
    }

    let delta = rowWidth - rowPlusGap;

    if (row.length > 0 && delta > 0) {
        var cutoff = calculateCutOff({rowWidth, gap, delta, row});
        for(var i in row) {
            var pixelsToRemove = cutoff[i];
            let item = row[i];
            item.maxWidth = item.width - pixelsToRemove;
        }
    } else {
        for(var j in row) {
            let item = row[j];
            item.maxWidth = item.width;
        }
    }

    return row;
    
}

    
export const getGallery = ({maxWidth, maxRows, items = [], gap = 0}) => {
    if (!maxWidth) return [];

    let rows = []

    while (items.length > 0) {
        rows.push(getGalleryRow({maxWidth, gap, items}));
    }

    let cols = []

    for (var r in rows) {
        for (var i in rows[r]) {
            var item = rows[r][i];
            if (maxRows) {
                if(r < maxRows) {
                    cols.push(item);
                }
            }  else {
                cols.push(item);
            }
        }
    }

    return cols

}