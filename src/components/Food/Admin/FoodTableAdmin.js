import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import React from "react";
import styled from "styled-components";

const FoodTableAdminStyles = styled.div`
width: 100%;
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
      <TableRow key={"food-" + idx} className="clickable" onClick={() => onFoodClick(food)}>
        <TableCell>{food.user_name}</TableCell>
        <TableCell align="center">{food.email}</TableCell>
        <TableCell align="right">{food.name}</TableCell>
        <TableCell align="right">{food.meal}</TableCell>
        <TableCell align="right">{food.calorie}</TableCell>
        <TableCell align="right">{food.taken_at}</TableCell>
        <TableCell align="right">{food.created_at.split(' ')[0]}</TableCell>
      </TableRow>
    ))
  )
}

const FoodTableAdmin = ({ foods, onFoodClick }) => {
  
  return(
    <FoodTableAdminStyles>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>User Name</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="right">Food Name</TableCell>
              <TableCell align="right">Meal</TableCell>
              <TableCell align="right">Calorie(s)</TableCell>
              <TableCell align="right">Taken Date</TableCell>
              <TableCell align="right">Inserted Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <FoodTableData foods={foods} onFoodClick={onFoodClick}/>
          </TableBody>
        </Table>
      </TableContainer>
    </FoodTableAdminStyles>
  )
}

export default FoodTableAdmin;