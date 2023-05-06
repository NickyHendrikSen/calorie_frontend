import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import React from "react";
import styled from "styled-components";

const MealTableStyles = styled.div`
.no-meal{
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

const MealTableData = ({ meals, onMealClick }) => {
  if(meals === null || meals === undefined || !meals){
    return(
      <TableRow>
        <TableCell colSpan="100%" className="no-food">Loading...</TableCell>
      </TableRow>
    )
  }
  else if(meals.length === 0){
    return(
      <TableRow>
        <TableCell colSpan="100%" className="no-meal">No meals, Yet.</TableCell>
      </TableRow>
    )
  }
  
  return (
    meals.map((meal, idx) => (
      <TableRow key={"meal-" + idx} className="clickable"  onClick={() => onMealClick(meal)}>
        <TableCell>{meal.name}</TableCell>
        <TableCell align="right">{meal.has_maximum ? meal.maximum : "--"}</TableCell>
        <TableCell align="right">{meal.created_at.split(' ')[0]}</TableCell>
      </TableRow>
    ))
  )
}

const MealTable = ({ meals, onMealClick }) => {
  
  return(
    <MealTableStyles>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          {meals && meals.length > 0 &&
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Maximum Food Entries</TableCell>
                <TableCell align="right">Inserted Date</TableCell>
              </TableRow>
            </TableHead>
          }
          <TableBody>
            <MealTableData meals={meals} onMealClick={onMealClick}/>
          </TableBody>
        </Table>
      </TableContainer>
    </MealTableStyles>
  )
}

export default MealTable;