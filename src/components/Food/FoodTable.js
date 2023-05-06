import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import getTimeFromDate from "../../utils/getTimeFromDate";

const FoodTableStyles = styled.div`
.no-food{
  text-align: center;
}
.clickable{
  cursor: pointer;
  transition-duration: 0.2s;
  &:hover{
    background-color: var(--color-grey);
  }
}
`

const FoodTableData = ({ foods, onFoodClick }) => {
  if(foods === null || foods === undefined || !foods){
    return(
      <TableRow>
        <TableCell colSpan="100%" className="no-food">Loading...</TableCell>
      </TableRow>
    )
  }
  else if(foods.length === 0){
    return(
      <TableRow>
        <TableCell colSpan="100%" className="no-food">No Foods, Yet.</TableCell>
      </TableRow>
    )
  }
  
  return (
    foods.map((food, idx) => (
      <TableRow key={"food-" + idx} className="clickable"  onClick={() => onFoodClick(food)}>
        <TableCell>{food.name}</TableCell>
        <TableCell align="right">{food.calorie}</TableCell>
        <TableCell align="right">{getTimeFromDate(food.taken_at)}</TableCell>
        <TableCell align="right">{food.created_at.split(' ')[0]}</TableCell>
      </TableRow>
    ))
  )
}

const FoodTable = ({ foods, onFoodClick }) => {
  
  return(
    <FoodTableStyles>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          {foods && foods.length > 0 &&
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Calorie(s)</TableCell>
                <TableCell align="right">Taken Time</TableCell>
                <TableCell align="right">Inserted Date</TableCell>
              </TableRow>
            </TableHead>
          }
          <TableBody>
            <FoodTableData foods={foods} onFoodClick={onFoodClick}/>
          </TableBody>
        </Table>
      </TableContainer>
    </FoodTableStyles>
  )
}

export default FoodTable;