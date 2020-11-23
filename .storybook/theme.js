import logo from "./img/logo.svg"
import { create } from '@storybook/theming/create';

import "./css/Akkurat.css"
import "./css/AkkuratMono.css"
import "./css/MaterialIcons.css"

export default create({
    base: 'light',

    // Typography
    fontBase: '"Akkurat", sans-serif',
    fontCode: 'monospace',

    /*

    colorPrimary: 'hotpink',
    colorSecondary: 'deepskyblue',

    // UI
    appBg: 'white',
    appContentBg: 'silver',
    appBorderColor: 'grey',
    appBorderRadius: 4,


    // Text colors
    textColor: 'black',
    textInverseColor: 'rgba(255,255,255,0.9)',

    // Toolbar default and active colors
    barTextColor: 'silver',
    barSelectedColor: 'black',
    barBg: 'hotpink',

    // Form colors
    inputBg: 'white',
    inputBorder: 'silver',
    inputTextColor: 'black',
    inputBorderRadius: 4,

    */

    brandTitle: 'KulturPunkt + Kiosk',
//    brandUrl: 'https://example.com',
//    brandImage: logo,
});