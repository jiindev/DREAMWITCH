import {createGlobalStyle} from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
    ${reset};
    @font-face { font-family: 'CookieRun-Regular'; src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/CookieRun-Regular.woff') format('woff'); font-weight: normal; font-style: normal; }
    @font-face { font-family: 'GmarketSansMedium'; src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansMedium.woff') format('woff'); font-weight: normal; font-style: normal; }
    html, body {
        height: 100%;
        background-color: ${props => props.theme.yellowLight};
        font-family: 'GmarketSansMedium';
        font-size: 14px;
    }
`;

export default GlobalStyle;