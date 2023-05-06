import React, { useEffect, useState } from "react";
import styled from "styled-components";
import FoodTableAdmin from "../../components/Food/Admin/FoodTableAdmin";
import Modal from "../../components/Modal/Modal";
import FoodEdit from "../../components/Food/FoodEdit";
import FoodFormAdmin from "../../components/Food/Admin/FoodFormAdmin";
import axiosClient from "../../axiosClient";
import Container from "../../components/Layout/Container";
import { Pagination } from "@mui/material";

const AdminFoodPageStyles = styled.div`
.container{
  padding: 25px;
}
.pagination{
  display: flex;
  justify-content: center;
  padding: 20px;
}
`

const AdminFoodPage = () => {

  const [ foods, setFoods ] = useState(null);
  const [ pickedFood, setPickedFood ] = useState(null);
  const [ showModal, setShowModal ] = useState(false);
  const [ pageInfo, setPageInfo ] = useState({
    current: 1,
    last: 1,
  })

  const refreshList = (pageNumber) => {
    setShowModal(false);

    if(!pageNumber) pageNumber = pageInfo.current

    axiosClient.get("getAllFood?page=" + pageNumber).then((res) => {
      if(res.data){
        setFoods(res.data.foods.data)
        setPageInfo({
          current: res.data.foods.current_page,
          last: res.data.foods.last_page
        })
      }
    })
  }

  const onFoodClick = (food) => {
    if(!food) return;
    setPickedFood(food);
    setShowModal(true);
  }

  const changePage = (e, pageNumber) => {
    if(pageNumber === pageInfo.current || pageNumber < 1 || pageNumber > pageInfo.last) return;
    setFoods(null)
    setPageInfo((prevState) => ({...prevState,  current: pageNumber}))
    refreshList(pageNumber);
  }

  useEffect(() => {
    refreshList(1);
  }, [])

  return(
    <AdminFoodPageStyles>
      <Modal show={showModal} setShowModal={setShowModal}>
        <FoodEdit food={pickedFood} refreshList={refreshList}/>
      </Modal>
      <div className="container">
        <FoodFormAdmin refreshList={refreshList}/>
      </div>
      <Container>
        <FoodTableAdmin foods={foods} onFoodClick={onFoodClick}/>
        <Pagination count={pageInfo.last} page={pageInfo.current} className="pagination" onChange={changePage}/>
      </Container>
    </AdminFoodPageStyles>
  )
}

export default AdminFoodPage;