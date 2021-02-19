const getImageOffset = (element) => {
    let rect = element.getBoundingClientRect();
    let win = element.ownerDocument.defaultView;

    return {
        top: rect.top + win.pageYOffset,
        left: rect.left + win.pageXOffset
    };
}

export const getImagePointEvent = (event) => {
    const imgW = event.target.width;
    const imgH = event.target.height;

    const imgOffset = getImageOffset(event.target);

    const offsetX = event.pageX - imgOffset.left;
    const offsetY = event.pageY - imgOffset.top;

    const x = (offsetX / imgW - 0.5) * 2;
    const y = (offsetY / imgH - 0.5) * -2;

    const left = (offsetX / imgW) * 100;
    const top = (offsetY / imgH) * 100;

    // reticle


    return {
        left: left,
        top: top,
        x: x,
        y: y,
    }

}

export default getImagePointEvent