export const getImageCropdataStyles = ({imageCropdata, parent, image }) => {

    const parentW = parent.offsetWidth;
    const parentH = parent.offsetHeight;
    const parentRatio = parentW / parentH;

    const imageW = image.naturalWidth;
    const imageH = image.naturalHeight;
    const imageRatio = imageW / imageH;

    const cropW = imageCropdata && imageCropdata.width || imageW
    const cropH = imageCropdata && imageCropdata.height || imageH
    const cropX = imageCropdata && imageCropdata.x || 0
    const cropY = imageCropdata && imageCropdata.y || 0
    const cropRatio = cropW && cropH && cropW / cropH || imageRatio

    // horiz or vert

    let cropboxStyle = {};

    if (cropRatio > parentRatio) {

        cropboxStyle = {
            width: "100%",
            height: (parentW / cropW) * cropH + "px"
        }
        
    } else {

        cropboxStyle = {
            width: (parentH / cropH) * cropW + "px",
            height: "100%"
        }

    }

    // image

    const imageWidth = imageW / cropW * 100;
    const imageHeight = imageH / cropH * 100;

    const imageX = cropX / imageW * 100 * -1;
    const imageY = cropY / imageH * 100 * -1;

    const imageTransform = 'translateX('+ imageX + '%) translateY('+imageY+'%)';

    const imageStyle = {
        position: 'absolute',
        top: 0,
        right: 'auto',
        bottom: 'auto',
        left: 0,
        width: imageWidth + "%",
        height: 'auto',
        maxWidth: 'none',
        maxHeight: 'none',
        transformOrigin: 'top left',
        transform: imageTransform
    }

    return {
        cropbox: cropboxStyle,
        image: imageStyle
    }

}

export default getImageCropdataStyles