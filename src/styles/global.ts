import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    };
    html {
        font-size: 62.5%;
    };
    body {
        color: #fff;
        background-color: #151515;
        font-family: 'Roboto', sans-serif;        
    };
    #root {
        width: 100vw;
        height: 100%;
    };
    a {
        color: #fff;
        text-decoration: none;
        font-family: 'Noto Sans', sans-serif;
    };

    ::-webkit-scrollbar {
        width: .8rem;
    };
    ::-webkit-scrollbar-thumb {
        background-color: #777;
        border-left: solid .1rem #303030;
    };
    ::-webkit-scrollbar-thumb:hover {
        background-color: #555;
    };
`
