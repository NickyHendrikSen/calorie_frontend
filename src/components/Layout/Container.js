import React from "react"
import styled from "styled-components"

const ContainerStyles = styled.div`
margin: 25px;
box-shadow: var(--drop-shadow);
`

const Container = ({ children }) => {
  return (
    <ContainerStyles>
      {children}
    </ContainerStyles>
  )
}

export default Container;