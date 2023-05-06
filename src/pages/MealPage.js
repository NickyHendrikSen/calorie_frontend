import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axiosClient from "../axiosClient";
import Container from "../components/Layout/Container";
import MealEdit from "../components/Meal/MealEdit";
import MealForm from "../components/Meal/MealForm";
import MealTable from "../components/Meal/MealTable";
import Modal from "../components/Modal/Modal";

const MealPageStyles = styled.div`
.padding{
  padding: 25px; 
}
`

const MealPage = () => {

  const [ meals, setMeals ] = useState(null);
  const [ mealPicked, setMealPicked ] = useState(null);
  const [ showModal, setShowModal ] = useState(false);

  const refreshList = () => {
    setShowModal(false);
    axiosClient.get("getMeal").then((res) => {
      if(res.data){
        setMeals(res.data.meals)
      }
    })
  }

  const onMealClick = (meal) => {
    if(!meal);
    setMealPicked(meal);
    setShowModal(true);
  }

  useEffect(() => {
    refreshList();
  }, [])

  return(
    <MealPageStyles>
      <Modal show={showModal} setShowModal={setShowModal}>
        <MealEdit meal={mealPicked} refreshList={refreshList}/>
      </Modal>
      <div className="padding">
        <MealForm refreshList={refreshList}/>
      </div>
      <Container>
        <MealTable meals={meals} onMealClick={onMealClick}/>
      </Container>
    </MealPageStyles>
  )
}

export default MealPage;