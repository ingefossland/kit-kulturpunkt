import Color from 'color';

export const getContrastColor = (hex) => {
    const color = Color(hex)
    return color.isLight() && "black" || "white"
}