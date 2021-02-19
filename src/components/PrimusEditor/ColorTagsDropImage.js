import React, { useCallback, useState, useEffect, useRef } from "react"
import Dropzone, { useDropzone } from 'react-dropzone'
import Palette, { usePalette } from 'react-palette'

const ColorTagsDropImageField = ({className = "MuiAutocomplete-dropzone", children, onClick, onChange, ...props}) => {

    const [imageUrl, setImageUrl] = useState(props.imageUrl || null)

    useEffect(() => {
        setImageUrl(props.imageUrl)
    }, [props.imageUrl])

    const _onDrop = useCallback((acceptedFiles) => {
        acceptedFiles.forEach((file) => {
            const reader = new FileReader()
    
            reader.onabort = () => console.log('file reading was aborted')
            reader.onerror = () => console.log('file reading has failed')
            reader.onload = () => {
                setImageUrl(reader.result)
            }
            reader.readAsDataURL(file)
          
        })
        
      }, [])
    

    const { data, loading, error } = usePalette(imageUrl)

    useEffect(() => {

        let colors = ["vibrant","lightVibrant","darkVibrant","muted","lightMuted","darkMuted"]

        let formData = []

        colors.map(color => {
            const value = data && data[color]

            value && formData.push({
                label: color,
                value: data && data[color]
            })
        })

        formData.length && onChange && onChange(formData)

    }, [data])

    const { getRootProps, getInputProps } = useDropzone({onDrop: _onDrop})

    if (onClick) {
        return (
            <div className={className} onClick={onClick}>
                {children}
            </div>
        )
    }

    return (
        <div className={className} {...getRootProps()}>
            <input {...getInputProps()} />
            {children}
        </div>
      )


}


export default ColorTagsDropImageField