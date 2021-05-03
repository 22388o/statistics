import React from 'react'
import { ThemeProvider as StyledComponentsThemeProvider, createGlobalStyle } from 'styled-components'
import { useDarkModeManager } from '../contexts/LocalStorage'
import styled from 'styled-components'
import { Text } from 'rebass'

export default function ThemeProvider({ children }) {
  const [darkMode] = useDarkModeManager()

  return <StyledComponentsThemeProvider theme={theme(darkMode)}>{children}</StyledComponentsThemeProvider>
}

export const theme = color => ({
  customColor: color,
  textColor: color,

  panelColor: 'rgba(255, 255, 255, 0)',
  backgroundColor: '#212429',

  varenGold: '#ffd149',

  concreteGray: '#292C2F',
  inputBackground: '#1F1F1F',
  shadowColor: '#000',
  mercuryGray: '#333333',

  text1: '#FFFFFF',
  text2: '#C3C5CB',
  text3: '#6C7284',
  text4: '#565A69',
  text5: '#2C2F36',

  // special case text types
  white: '#FFFFFF',

  // backgrounds / greys
  bg1: '#000119',
  bg2: '#000119',
  bg3: '#3949ab',
  bg4: '#171a36',
  bg5: '#6C7284',
  bg6: '#181b37',

  //specialty colors
  modalBG: 'rgba(0,0,0,.425)',
  advancedBG: '#000119',
  onlyLight: 'transparent',
  divider: 'rgba(43, 43, 43, 0.435)',

  //primary colors
  primary1: '#bebebe',
  primary2: '#dddddd',
  primary3: '#ffffff',
  primary4: '#376bad70',
  primary5: '#202F46',

  // color text
  primaryText1: '#87A9FF',

  // secondary colors
  secondary1: '#ffd149',
  secondary2: '#17000b26',
  secondary3: '#17000b26',

  shadow1: '#000',

  // other
  red1: '#FF6871',
  green1: '#27AE60',
  yellow1: '#FFE270',
  yellow2: '#F3841E',
  link: '#bebebe',
  grey: '#bebebe',
  darkgrey: '#dddddd',

  background: '#000119'
})

const TextWrapper = styled(Text)`
  color: ${({ color, theme }) => theme[color]};
`

export const TYPE = {
  main(props) {
    return <TextWrapper fontWeight={500} fontSize={14} color={'text1'} {...props} />
  },

  body(props) {
    return <TextWrapper fontWeight={400} fontSize={14} color={'text1'} {...props} />
  },

  small(props) {
    return <TextWrapper fontWeight={500} fontSize={11} color={'text1'} {...props} />
  },

  header(props) {
    return <TextWrapper fontWeight={600} color={'text1'} {...props} />
  },

  largeHeader(props) {
    return <TextWrapper fontWeight={500} color={'text1'} fontSize={24} {...props} />
  },

  light(props) {
    return <TextWrapper fontWeight={400} color={'text3'} fontSize={14} {...props} />
  },

  pink(props) {
    return <TextWrapper fontWeight={props.faded ? 400 : 600} color={props.faded ? 'text1' : 'text1'} {...props} />
  }
}

export const Hover = styled.div`
  :hover {
    cursor: pointer;
  }
`

export const Link = styled.a.attrs({
  target: '_blank',
  rel: 'noopener noreferrer'
})`
  text-decoration: none;
  cursor: pointer;
  color: ${({ theme }) => theme.primary1};
  font-weight: 500;
  :hover {
    text-decoration: underline;
  }
  :focus {
    outline: none;
    text-decoration: underline;
  }
  :active {
    text-decoration: none;
  }
`

export const Background = styled.div`
  position: absolute;
  height: 100vh;
  width: 100vw;
  background-position: 0 20vh;
  background-size: 60vh auto;
  background-repeat: no-repeat;
  z-index: 2;
  opacity: 0.05;
`
export const ThemedBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  pointer-events: none;
  max-width: 200vw !important;
  height: 100vw;
  position: absolute;
  z-index: 1;
  background: radial-gradient(50% 50% at 50% 50%, rgb(41, 44, 71) 0%, rgb(0, 1, 32) 100%);
  transform: translateY(-50vw);
`

// TODO: create a light background-image for light mode
export const GlobalStyle = createGlobalStyle`
  @import url('https://rsms.me/inter/inter.css');
  html { font-family: 'Inter', sans-serif; }
  @supports (font-variation-settings: normal) {
    html { font-family: 'Inter var', sans-serif; }
  }
  
  html,
  body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    font-size: 14px;    
    min-height: 100vh;
    background-color: #000120;
  }

  a {
    text-decoration: none;

    :hover {
      text-decoration: none
    }
  }
  
.three-line-legend {
	width: 100%;
	height: 70px;
	position: absolute;
	padding: 8px;
	font-size: 12px;
	color: #20262E;
	background-color: rgba(255, 255, 255, 0.23);
	text-align: left;
	z-index: 10;
  pointer-events: none;
}

.three-line-legend-dark {
	width: 100%;
	height: 70px;
	position: absolute;
	padding: 8px;
	font-size: 12px;
	color: white;
	background-color: rgba(255, 255, 255, 0.23);
	text-align: left;
	z-index: 10;
  pointer-events: none;
}

@media screen and (max-width: 800px) {
  .three-line-legend {
    display: none !important;
  }
}

.tv-lightweight-charts{
  width: 100% !important;
  

  & > * {
    width: 100% !important;
  }
}

  html {
    font-size: 1rem;
    font-variant: none;
    color: 'black';
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    height: 100%;
  }
  
  @-webkit-keyframes sk-circleBounceDelay {
    0%, 80%, 100% {
      transform: scale(0);
    } 40% {
      transform: scale(1);
    }
  }
  
  @keyframes sk-circleBounceDelay {
    0%, 80%, 100% {
      transform: scale(0);
    } 40% {
      transform: scale(1);
    }
  }
`
