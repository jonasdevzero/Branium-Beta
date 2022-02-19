import { createGlobalStyle } from 'styled-components';

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
        background-color: #222;
    };
    ::-webkit-scrollbar-thumb:hover {
        background-color: #272727;
    };

    .overlay {
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;

      background-color: rgba(0, 0, 0, 0.7);
      z-index: 1;

      @keyframes overlay-fade-in {
        from {
          background-color: rgba(0, 0, 0, 0.1);
        }
        to {
          background-color: rgba(0, 0, 0, 0.7);
        }
      }

      animation-name: overlay-fade-in;
      animation-duration: .25s;      
    }

    @keyframes fade-in {
      from {
        opacity: .1;
      }
      to {
        opacity: 1;
      }
    }
`;
