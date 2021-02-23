import Color from 'color';

export const getContrastColor = (color) => {

    color = Color(color);

    if (color.isDark()) {
        return "white"
    } else {
        return "black"
    }

}