import React from 'react'
import styled from 'styled-components'

import Logo from '../../assets/logo.svg'

const TitleWrapper = styled.div`
  text-decoration: none;
  width: 100%;
  display: flex;
  flex: 0 0 100%;
  justify-content: center;
  align-items: center;
  z-index: 10;
`

export default function Title() {
  return (
    <TitleWrapper >
      <a id="link" href="/home">
        <img width="100%" src={Logo} alt="Varen Finance" />
      </a>
    </TitleWrapper>
  )
}
