import React from "react";
import styled from "styled-components";

const AverageCaloriesStyles = styled.div`
padding: 25px;
box-shadow: var(--drop-shadow);
display: inline-block;
.title-info, .current-info{
  letter-spacing: 2px;
  text-align: center;
}
svg{
  vertical-align: middle;
}
.calories-info{
  display: flex;
  align-items: center;
  .calories-count{
    width: 100%;
    text-align: center;
    font-size: 100px;
  }
}
`

const AverageCalories = ({ amount }) => {
  
  return(
    <AverageCaloriesStyles>
      <div className="title-info">Average Calories ( Last 7 days )</div>
      <div className="calories-info">
        <div className="calories-count">{amount ? amount.toFixed(2) : "--"}</div>
      </div>
      <div className="current-info">Calories</div>
    </AverageCaloriesStyles>
  )
}

export default AverageCalories;