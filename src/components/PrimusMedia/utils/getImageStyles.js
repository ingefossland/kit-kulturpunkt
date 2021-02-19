//import svgDuotone from "../filters/duotone.svg"
//import svgVignette from "../filters/vignette.svg"
//import svgGrayscale from "../filters/grayscale.svg"

export const getImageFiltersStyle = ({imageFilters}) => {

    if (!imageFilters) {
        return
    }
    
    let { brightness, contrast, saturation, opacity, blur, duotone, vignette, grayscale } = imageFilters;

    let filters = []

    /*
    if (duotone) {
        filters.push('url('+svgDuotone+'#filter)')
    }

    if (vignette) {
        filters.push('url('+svgVignette+'#filter)')
    }

    if (grayscale) {
        filters.push('url('+svgGrayscale+'#filter)')
    }
    */

    if (brightness) {
        brightness = brightness + 100;
        filters.push('brightness('+brightness+'%)')
    }

    if (contrast) {
        contrast = contrast + 100;
        filters.push('contrast('+contrast+'%)')
    }

    if (saturation) {
        saturation = saturation + 100;
        filters.push('saturate('+saturation+'%)')
    }

    if (opacity) {
        filters.push('opacity('+opacity+'%)')
    }

    if (blur) {
        filters.push('blur('+blur+'px)')
    }

    if (!filters) {
        return undefined
    }

    return {
        filter: filters.join(' ')
    }

}

export const getImageContainStyle = ({
    cropRatio, cropWidth, cropHeight, cropX, cropY,
    parentRatio, parentWidth, parentHeight, 
    imageRatio, imageWidth, imageHeight}) => {

    // horiz or vert

    let cropboxStyle = {};

    if (cropRatio > parentRatio) {
        return {
            width: "100%",
            height: (parentWidth / cropWidth) * cropHeight + "px"
        }
    } else {
        return {
            width: (parentHeight / cropHeight) * cropWidth + "px",
            height: "100%"
        }
    }

}

export const getImageCoverStyle = ({
    cropRatio, cropWidth, cropHeight, cropX, cropY,
    parentRatio, parentWidth, parentHeight, 
    imageRatio, imageWidth, imageHeight}) => {

    // cropbox

    let coverRatio, cropboxStyle

    if (cropRatio > parentRatio) {
        coverRatio = cropRatio/parentRatio
        return {
            width: coverRatio * 100 + "%",
            height: "100%",
            marginLeft: (coverRatio*100-100)/2 * -1 + "%"
        }
    } else {
        coverRatio = parentRatio/cropRatio
        return {
            width: "100%",
            height: coverRatio * 100 + "%",
        }
    }

}

export const getImageCropStyle = ({
        imageWidth,
        imageHeight,
        cropX,
        cropY,
        cropWidth,
        cropHeight
    }) => {

   const cropImageWidth = imageWidth / cropWidth * 100;
   const cropImageHeight = imageHeight / cropHeight * 100;

   const cropImageX = cropX / imageWidth * 100 * -1;
   const cropImageY = cropY / imageHeight * 100 * -1;

   const imageTransform = 'translateX('+cropImageX+'%) translateY('+cropImageY+'%)';

   return {
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

}

export const getImageStyles = ({imageCropdata, imageFocalpoint, imageFilters, objectFit = "contain", parentRef, imageRef }) => {
    const parent = parentRef && parentRef.current
    const parentWidth = parent.offsetWidth;
    const parentHeight = parent.offsetHeight;
    const parentRatio = parentWidth / parentHeight;

    const image = imageRef && imageRef.current
    const imageWidth = image.naturalWidth;
    const imageHeight = image.naturalHeight;
    const imageRatio = imageWidth / imageHeight;

    const cropX = imageCropdata && imageCropdata.x * imageWidth / 100 || 0
    const cropY = imageCropdata && imageCropdata.y * imageHeight / 100  || 0
    const cropWidth = imageCropdata && imageCropdata.width * imageWidth / 100 || imageWidth
    const cropHeight = imageCropdata && imageCropdata.height * imageHeight / 100 || imageHeight
    const cropRatio = cropWidth / cropHeight

    let cropboxStyle = {}, cropStyle = {}, filterStyle = {}

    if (objectFit === "contain") {
        cropboxStyle = getImageContainStyle({parentWidth, parentHeight, parentRatio, imageWidth, imageHeight, imageRatio, cropX, cropY, cropWidth, cropHeight, cropRatio})
        cropStyle = getImageCropStyle({parentWidth, parentHeight, parentRatio, imageWidth, imageHeight, imageRatio, cropX, cropY, cropWidth, cropHeight, cropRatio})
    }

    if (objectFit === "cover") {
        cropboxStyle = getImageCoverStyle({parentWidth, parentHeight, parentRatio, imageWidth, imageHeight, imageRatio, cropX, cropY, cropWidth, cropHeight, cropRatio})
        cropStyle = getImageCropStyle({parentWidth, parentHeight, parentRatio, imageWidth, imageHeight, imageRatio, cropX, cropY, cropWidth, cropHeight, cropRatio})
    }

    if (imageFilters) {
        filterStyle = getImageFiltersStyle({imageFilters})
    }

    const imageStyle = {
        ...cropStyle,
        ...filterStyle
    }
    

    return {
        cropbox: cropboxStyle,
        image: imageStyle
    }

}

export default getImageStyles