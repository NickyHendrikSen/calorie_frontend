import React from "react";
import styled from "styled-components";

const HomePageStyles = styled.div`
display: flex;
justify-content: center;
align-items: center;
height: calc(100vh - 80px);
font-size: 50px;
font-weight: bold;
`

const HomePage = () => {
  return(
    <HomePageStyles>
      Home
    </HomePageStyles>
  )
}

export default HomePage;