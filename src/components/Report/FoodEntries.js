import { TiArrowSortedUp, TiArrowSortedDown } from "react-icons/ti";
import React from "react";
import styled from "styled-components";

const FoodEntriesStyles = styled.div`
padding: 25px;
max-width: 250px;
box-shadow: var(--drop-shadow);
display: inline-block;
.title-info, .current-info{
  letter-spacing: 2px;
}
svg{
  vertical-align: middle;
}
.food-info{
  display: flex;
  align-items: center;
  .food-count{
    font-size: 100px;
  }
  .percentage{
    font-size: 20px;
    margin-left: 20px;
    span{
      margin-left: 5px;
    }
  }
}
.gain{
  color: var(--color-green);
}
.loss{
  color: red;
}
`

const FoodEntries = ({ amount, percentage, current }) => {
  
  return(
    <FoodEntriesStyles>
      <div className="title-info">Food Entries ( Last 7 days )</div>
      <div className="food-info">
        <div className="food-count">{amount}</div>
        <div className="percentage" >
          {percentage >= 0 || percentage === "inf"
            ? <TiArrowSortedUp className="gain"/>
            : <TiArrowSortedDown className="loss"/>
          }
          <span>{percentage === "inf" ? "0" : Math.abs(percentage).toFixed(2)}%</span>
        </div>
      </div>
      <div className="current-info">+{current || 0} ( Last 24 Hours )</div>
    </FoodEntriesStyles>
  )
}

export default FoodEntries;