export const getOffset = (el) => {
    const rect = el.getBoundingClientRect();
    return {
      left: rect.left + window.scrollX,
      top: rect.top + window.scrollY
    };
  }

export const getImagePointEvent = (event, parent) => {

    if (!parent) {
        parent = event.target.offsetParent
    }

    const offset = getOffset(parent);

    const x = event.pageX - offset.left;
    const y = event.pageY - offset.top;

    const left = (x) / (parent.offsetWidth) * 100 
    const top = (y) / (parent.offsetHeight) * 100 

    const fx = (x / parent.offsetWidth - 0.5) * 2;
    const fy = (y / parent.offsetHeight - 0.5) * -2;

    return {
        x: fx,
        y: fy,
        top: top,
        left: left
    }

}