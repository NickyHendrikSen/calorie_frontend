import Input from "../Form/Input";
import React, { useState } from "react";
import styled from "styled-components";
import { LoadingButton } from '@mui/lab';
import { toast } from "react-toastify";
import getTimeFromDate from "../../utils/getTimeFromDate"
import axiosClient from "../../axiosClient";
import getDateFormat from "../../utils/getDateFormat";

const FoodEditStyles = styled.div`
width: 300px;
height: auto;
padding: 30px;
box-shadow: var(--drop-shadow);
background-color: var(--color-white);
.title{
  font-size: 30px;
  font-weight: 500;
}
.form-input{
  margin: 20px 0;
  width: 100%;
  &:last-child{
    margin-top: 40px;
    margin-bottom: 10px;
  }
  button{
    margin-right: 20px;
  }
}
`

const FoodEdit = ({ food, refreshList }) => {
  
  const [ deleteLoading, setDeleteLoading ] = useState(false);
  const [ editLoading, setEditLoading ] = useState(false);
  const [ errors, setErrors ] = useState({
    name: "",
    calorie: "",
    time: "",
  })
  const [ inputData, setInputData ] = useState({
    id: food.id,
    name: food.name || "",
    calorie: food.calorie || 1,
    time: getTimeFromDate(food.taken_at) || "00:00"
  })
  
  const deleteHandler = (e) => {
    e.preventDefault();

    setDeleteLoading(true);
    axiosClient.post("deleteFood", {id: inputData.id}, )
    .then((res) => {
      if(!res.data.success){
        toast.error(res.data.message)
      }
      else{
        toast.success(res.data.message)
        refreshList();
      }
    })
    .catch((err) =>{
      console.log(err)
    })
    .finally(() => {
      setDeleteLoading(false);
    })
  }

  const editHandler = (e) => {
    e.preventDefault();

    if(inputData.time === ""){
      setErrors(prevState => ({...prevState, time: "Time cannot be empty"}));
      return;
    }
    setEditLoading(true);
    axiosClient.post("editFood", {
      id: inputData.id,
      name: inputData.name,
      calorie: inputData.calorie,
      taken_at: getDateFormat(food.taken_at, inputData.time),
    })
    .then((res) => {
      if(!res.data.success){
        toast.error(res.data.message)
      }
      else{
        toast.success(res.data.message)
        refreshList();
      }
    })
    .catch((err) =>{
      const responseData = err.response.data;
      if(responseData){
        const responseErrors = responseData.errors;
        toast.error(responseData.message);
        if(responseErrors) {
          setErrors(responseErrors);
        }
      }
    })
    .finally(() => {
      setEditLoading(false);
    })
  }

  const nameChanged = (e) => {
    const val = e.target.value;
    setInputData(prevState => ({...prevState, name: val}));
  }

  const calorieChanged = (e) => {
    const val = e.target.value;
    setInputData(prevState => ({...prevState, calorie: parseInt(val)}));
  }

  const timeChanged = (e) => {
    const val = e.target.value;
    setInputData(prevState => ({...prevState, time: val}));
  }

  return(
    <FoodEditStyles>
      <div className="title">Food</div>
      <div className="form-input">
          <Input key="food-name" label="Name" type="text" onChange={nameChanged} value={inputData.name} error={errors.name} />
      </div>
      <div className="form-input">
          <Input key="food-calorie" label="Calorie" type="number" onChange={calorieChanged} value={inputData.calorie} error={errors.calorie} />
      </div>
      <div className="form-input">
          <Input key="food-time" label="Time" type="time" onChange={timeChanged} value={inputData.time} error={errors.time}/>
      </div>
      <div className="form-input">
        <LoadingButton variant="outlined" type="submit" onClick={editHandler}
          loading={editLoading} disabled={editLoading || deleteLoading}>
          Edit
        </LoadingButton>
        <LoadingButton variant="outlined" type="submit" color="secondary" onClick={deleteHandler}
          loading={deleteLoading} disabled={editLoading || deleteLoading}>
          Delete
        </LoadingButton>
      </div>
    </FoodEditStyles>
  )
}

export default FoodEdit;