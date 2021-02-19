export const getImageCropdataStyles = ({imageCropdata, objectFit = "contain", parent, image }) => {
    const parentWidth = parent.offsetWidth;
    const parentHeight = parent.offsetHeight;
    const parentRatio = parentWidth / parentHeight;

    const imageWidth = image.naturalWidth;
    const imageHeight = image.naturalHeight;
    const imageRatio = imageWidth / imageHeight;

    const cropX = imageCropdata && imageCropdata.x * imageWidth / 100 || 0
    const cropY = imageCropdata && imageCropdata.y * imageHeight / 100  || 0
    const cropWidth = imageCropdata && imageCropdata.width * imageWidth / 100 || imageWidth
    const cropHeight = imageCropdata && imageCropdata.height * imageHeight / 100 || imageHeight

    const cropRatio = cropWidth / cropHeight

    // horiz or vert

    let cropboxStyle = {};

    if (cropRatio > parentRatio) {

        cropboxStyle = {
            width: "100%",
            height: (parentWidth / cropWidth) * cropHeight + "px"
        }
        
    } else {

        cropboxStyle = {
            width: (parentHeight / cropHeight) * cropWidth + "px",
            height: "100%"
        }

    }

    // image

    const cropImageWidth = imageWidth / cropWidth * 100;
    const cropImageHeight = imageHeight / cropHeight * 100;

    const cropImageX = cropX / imageWidth * 100 * -1;
    const cropImageY = cropY / imageHeight * 100 * -1;

    const imageTransform = 'translateX('+cropImageX+'%) translateY('+cropImageY+'%)';

    const imageStyle = {
        position: 'absolute',
        top: 0,
        right: 'auto',
        bottom: 'auto',
        left: 0,
        width: cropImageWidth + "%",
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