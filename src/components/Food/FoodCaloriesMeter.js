import React from "react";
import styled from "styled-components";
import Container from "../Layout/Container";

const FoodCaloriesMeterStyles = styled.div`
.calories-info{
  font-size: 30px;
  text-align: center;
  padding-top: 20px;
  font-weight: bold;
}
.calories-description{
  letter-spacing: 2px;
  text-align: center;
  padding-bottom: 10px;
}
.calories-warning{
  text-align: center;
}
.red{
  color: red;
}
.meter-wrapper{
  padding: 20px 0;
  .meter{
    width: 90%;
    background-color: var(--color-grey);
    box-shadow: var(--drop-shadow);
    border-radius: 10px;
    height: 20px;
    margin: 0 auto;
    overflow: hidden;
    .bar{
      height: 100%;
      width: ${props => props.totalCalories/props.calorieLimit*100}%;
      background-color: hsl(${props => 120 - Math.min(props.totalCalories/props.calorieLimit*120, 120)}, 100%, 50%);
      border-radius: 10px;
    }
  }
}
`

FoodCaloriesMeterStyles.defaultProps = {
  totalCalories: 0,
  calorieLimit: process.env.REACT_APP_CALORIES_LIMIT
}

const FoodCaloriesMeter = ({ totalCalories, calorieLimit }) => {
  
  const limit = calorieLimit || process.env.REACT_APP_CALORIES_LIMIT;

  const getWarning = () => {
    const left = limit - totalCalories
    if(left === 0){
      return "You have taken the perfect amount of calories needed"
    }
    else if(left > 0){
      return "You need " + left + " more calories to reach your daily calories"
    }
    else{
      return "You have reached your daily calories limit"
    }
  }

  return(
    <FoodCaloriesMeterStyles totalCalories={totalCalories} calorieLimit={calorieLimit}>
      <Container>
        <div className="calories-info">
          {totalCalories} / {limit}
        </div>
        <div className="calories-description">CALORIES</div>
        <div className={"calories-warning" + (limit < totalCalories ? " red" : "")} >{getWarning()}</div>
        <div className="meter-wrapper">
          <div className="meter">
            <div className="bar">&nbsp;
            </div>
          </div>
        </div>
      </Container>
    </FoodCaloriesMeterStyles>
  )
}

export default FoodCaloriesMeter;