import { createGlobalStyle, css } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'icomoon';
    src: url('/fonts/icomoon.eot?z2gm6x');
    src: url('/fonts/icomoon.eot?z2gm6x#iefix') format('embedded-opentype'),
      url('/fonts/icomoon.ttf?z2gm6x') format('truetype'),
      url('/fonts/icomoon.woff?z2gm6x') format('woff'),
      url('/fonts/icomoon.svg?z2gm6x#icomoon') format('svg');
    font-weight: normal;
    font-style: normal;
    font-display: block;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  ${({ theme }) => css`
    html {
      font-size: 62.5%;
    }

    body {
      background-color: ${theme.colors.black};
      font-family: ${theme.font.family};
      font-size: ${theme.font.sizes.medium};
    }

    span {
      font-family: ${theme.font.family};
      font-size: ${theme.font.sizes.medium};
    }
  `}

`
export default GlobalStyles
