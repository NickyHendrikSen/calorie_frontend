import React from "react";
import styled from "styled-components";

const MealTypeStyles = styled.div`
padding: 15px;
font-size: 25px;
text-align: center;
border-bottom: 1px solid var(--color-black);
background-color: var(--color-orange);
`

const MealType = ({ name }) => {
  
  return(
    <MealTypeStyles>
      {name}
    </MealTypeStyles>
  )
}

export default MealType;