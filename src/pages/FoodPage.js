import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axiosClient from "../axiosClient";
import FoodForm from "../components/Food/FoodForm";
import FoodTable from "../components/Food/FoodTable";
import FoodCaloriesMeter from "../components/Food/FoodCaloriesMeter"
import Modal from "../components/Modal/Modal"
import Input from "../components/Form/Input";
import Container from "../components/Layout/Container";
import { ArrowCircleLeftOutlined, ArrowCircleRightOutlined } from '@mui/icons-material';
import MealType from "../components/Meal/MealType";

import getDateFormat from "../utils/getDateFormat"
import FoodEdit from "../components/Food/FoodEdit";

const FoodPageStyles = styled.div`
.date-picker{
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  & > * {
    margin: 0 30px;
  }
  .arrow{
    vertical-align: middle;
    cursor: pointer;
    background-color: transparent;
    border: none;
    outline: none;
    svg{
      vertical-align: middle
      width: 30px;
      height: 30px;
    }
    &:hover{
      opacity: 0.5;
    }
  }
}
.add-button{
  width: 100%;
  padding: 10px;
  border: none;
  cursor: pointer;
  background-color: var(--color-grey);
  text-transform: uppercase;
  &:hover{
    opacity: 0.5;
  }
}
`

const FoodPage = () => {

  const [ meals, setMeals ] = useState(null);
  const [ totalCalories, setTotalCalories ] = useState(0);
  const [ calorieLimit, setCalorieLimit ] = useState(0);
  const [ mealPicked, setMealPicked ] = useState(0);
  const [ pickedFood, setPickedFood ] = useState(null);
  const [ showAddModal, setAddModal ] = useState(false);
  const [ showEditModal, setEditModal ] = useState(false);
  const [ datePicked, setDatePicked ] = useState(Date.now())
  const [ loading, setLoading ] = useState(false);

  const refreshList = (date) => {
    setLoading(true);
    setAddModal(false);
    setEditModal(false);

    let dateFormat = date ? getDateFormat(date) : getDateFormat(datePicked)
    axiosClient.post("getUserFoodByDate", { taken_at: dateFormat }).then((res) => {
      setMeals(res.data.meals)
      setTotalCalories(res.data.totalCalories)
      setCalorieLimit(res.data.calorieLimit)
    })
    .finally(() => setLoading(false))
  }

  const goToPreviousDay = () => {
    const date = new Date().setDate(new Date(datePicked).getDate() - 1);
    setDatePicked(date)
    refreshList(date);
  }

  const goToNextDay = () => {
    const date = new Date().setDate(new Date(datePicked).getDate() + 1);
    setDatePicked(date)
    refreshList(date);
  }

  const dateChanged = (val) => {
    setDatePicked(val)
    refreshList(val);
  }

  const onAddClick = (idx) => {
    if(idx < 0) return;

    setMealPicked(idx);
    setAddModal(true);
  }

  const onFoodClick = (food) => {
    if(!food) return;
    setPickedFood(food);
    setEditModal(true);
  }

  const isMaximum = (meal) => {
    return meal.has_maximum && meal.foods.length >= meal.maximum 
  }

  useEffect(() => {
    refreshList(datePicked);
  }, [datePicked])

  return(
    <FoodPageStyles>
      <Modal show={showAddModal} setShowModal={setAddModal}>
        <FoodForm mealId={mealPicked} takenAt={datePicked} refreshList={refreshList}/>
      </Modal>
      <Modal show={showEditModal} setShowModal={setEditModal}>
        <FoodEdit food={pickedFood} refreshList={refreshList}/>
      </Modal>
      <FoodCaloriesMeter totalCalories={totalCalories} calorieLimit={calorieLimit}/>
      <Container>
        <div className="date-picker">
          <button className="arrow" onClick={goToPreviousDay} disabled={loading}>
            <ArrowCircleLeftOutlined />
          </button>
          <div>
            <Input type="date" onChange={dateChanged} value={datePicked} disabled={loading}/>
          </div>
          <button className="arrow" onClick={goToNextDay} disabled={loading}>
            <ArrowCircleRightOutlined />
          </button>
        </div>
      </Container>
      {
        meals &&
        meals.map((meal, idx) => (
          <Container key={idx}>
            <MealType name={meal.name}/>
            <FoodTable foods={meal.foods} onFoodClick={onFoodClick} />
            {
              !isMaximum(meal) &&
              <button className="add-button" onClick={() => onAddClick(meal.id)}>Add</button>
            }
            
          </Container>
        ))
      }
    </FoodPageStyles>
  )
}

export default FoodPage;