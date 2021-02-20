import qs from 'query-string';

export const getImageUrl = ({imageUrl, uploadProgress = 0}) => {

    if (!imageUrl) {
        return false
    }

    const { url, query } = qs.parseUrl(imageUrl)
    return qs.stringifyUrl({url, query: {...query, uploadProgress}})

}