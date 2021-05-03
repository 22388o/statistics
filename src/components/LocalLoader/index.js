import React from 'react'
import styled, { css } from 'styled-components'

const Wrapper = styled.div`
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;

  ${(props) =>
  props.fill && !props.height
    ? css`
          height: 100vh;
        `
    : css`
          height: 180px;
        `}
`

const Loader = styled.div`
  margin: 100px auto;
  width: 40px;
  height: 40px;
  position: relative;
  z-index: 5;
  
  .sk-child {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
  
    :before {
      content: '';
      display: block;
      margin: 0 auto;
      width: 15%;
      height: 15%;
      background-color: #bebebe;
      border-radius: 100%;
      animation: sk-circleBounceDelay 1.2s infinite ease-in-out both;
    }
  }
  
  .sk-circle2 {
    transform: rotate(30deg); 
  }
  .sk-circle3 {
    transform: rotate(60deg); 
  }
  .sk-circle4 {
    transform: rotate(90deg); 
  }
  .sk-circle5 {
    transform: rotate(120deg); 
  }
  .sk-circle6 {
    transform: rotate(150deg); 
  }
  .sk-circle7 {
    transform: rotate(180deg); 
  }
  .sk-circle8 {
    transform: rotate(210deg); 
  }
  .sk-circle9 {
    transform: rotate(240deg); 
  }
  .sk-circle10 {
    transform: rotate(270deg); 
  }
  .sk-circle11 {
    transform: rotate(300deg); 
  }
  .sk-circle12 {
    transform: rotate(330deg); 
  }
  .sk-circle2:before {
    animation-delay: -1.1s; 
  }
  .sk-circle3:before {
    animation-delay: -1s; 
  }
  .sk-circle4:before {
    animation-delay: -0.9s; 
  }
  .sk-circle5:before {
    animation-delay: -0.8s; 
  }
  .sk-circle6:before {
    animation-delay: -0.7s; 
  }
  .sk-circle7:before {
    animation-delay: -0.6s; 
  }
  .sk-circle8:before {
    animation-delay: -0.5s; 
  }
  .sk-circle9:before {
    animation-delay: -0.4s; 
  }
  .sk-circle10:before {
    animation-delay: -0.3s; 
  }
  .sk-circle11:before {
    animation-delay: -0.2s; 
  }
  .sk-circle12:before {
    animation-delay: -0.1s; 
  }
`

const LocalLoader = () => {
  return (
    <Wrapper>
      <Loader>
          <div className="sk-circle1 sk-child" />
          <div className="sk-circle2 sk-child" />
          <div className="sk-circle3 sk-child" />
          <div className="sk-circle4 sk-child" />
          <div className="sk-circle5 sk-child" />
          <div className="sk-circle6 sk-child" />
          <div className="sk-circle7 sk-child" />
          <div className="sk-circle8 sk-child" />
          <div className="sk-circle9 sk-child" />
          <div className="sk-circle10 sk-child" />
          <div className="sk-circle11 sk-child" />
          <div className="sk-circle12 sk-child" />
      </Loader>
    </Wrapper>
  )
}

export default LocalLoader
