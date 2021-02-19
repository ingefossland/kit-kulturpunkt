import svgDuotone from "../filters/duotone.svg"
import svgVignette from "../filters/vignette.svg"
import svgGrayscale from "../filters/grayscale.svg"

export const getImageFiltersStyle = ({imageFilters}) => {

    if (!imageFilters) {
        return
    }
    
    let { brightness, contrast, saturation, opacity, blur, duotone, vignette, grayscale } = imageFilters;

    let filters = []

    if (duotone) {
        filters.push('url('+svgDuotone+'#duotone)')
    }

    if (grayscale) {
        filters.push('url('+svgDuotone+'#grayscale)')
    }

    if (vignette) {
        filters.push('url('+svgVignette+'#vignette)')
    }

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

export default getImageFiltersStyle