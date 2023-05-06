import React from "react"
import styled from "styled-components"

const LayoutContainerStyles = styled.div`
min-height: 100vh;
padding-bottom: 30px;
`

const LayoutContainer = ({ children }) => {
  return (
    <LayoutContainerStyles>
      {children}
    </LayoutContainerStyles>
  )
}

export default LayoutContainer;