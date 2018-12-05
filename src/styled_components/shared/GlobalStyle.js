import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Noto+Sans+KR:300,400,700|Material+Icons');

  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    transition: .2s;
  }

  *::-webkit-scrollbar {
    display: none;
  }

  body {
    margin: 0;
    padding: 0;
    color: ${({ theme }) => theme.color[`${theme.primary}${theme.dark}`]};
    font-family: 'Noto Sans KR', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;

export default GlobalStyle;