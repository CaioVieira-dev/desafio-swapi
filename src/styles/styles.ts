import { createGlobalStyle } from 'styled-components'
import bg from '../assets/galaxy.png'

export const GlobalStyle = createGlobalStyle`
*{
    margin:0;
    padding: 0;
    box-sizing: border-box;
}
html, body {
    height: 100%;
    background-image: url(${bg});
}
`