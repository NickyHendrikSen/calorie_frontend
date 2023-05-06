import Input from "../Form/Input";
import React, { useState } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import { LoadingButton } from "@mui/lab";
import axiosClient from "../../axiosClient";
import getDateFormat from "../../utils/getDateFormat";

const FoodFormStyles = styled.div`
width: 300px;
height: auto;
padding: 30px;
box-shadow: var(--drop-shadow);
background-color: var(--color-white);
.title{
  font-size: 30px;
  font-weight: 500;
}
form{
  .form-input{
    margin: 20px 0;
    width: 100%;
    &:last-child{
      margin-top: 40px;
      margin-bottom: 10px;
    }
  }
  .buttons{
    button{
      margin-right: 20px;
    }
  }
}
`

const FoodForm = ({ refreshList, mealId, takenAt }) => {
  
  const [ errors, setErrors ] = useState({
    name: "",
    calorie: "",
    time: "",
  })
  const [ inputData, setInputData ] = useState({
    name: "",
    calorie: 1,
    time: "00:00",
  })
  const [ addLoading, setAddLoading ] = useState(false);

  const clearInput = () => {
    setInputData({
      name: "",
      calorie: 1,
    })
    setErrors({
      name: "",
      calorie: "",
    })
  }

  const submitHandler = (e) => {
    e.preventDefault();

    if(inputData.time === ""){
      setErrors(prevState => ({...prevState, time: "Time cannot be empty"}));
      return;
    }
    setAddLoading(true);
    axiosClient.post("addFood", {
      name: inputData.name,
      calorie: inputData.calorie,
      meal_id: mealId,
      taken_at: getDateFormat(takenAt, inputData.time)
    })
    .then((res) => {
      if(res.data.success){
        toast.success(res.data.message)
        clearInput();
        refreshList();
      }
      else{
        toast.error(res.data.message)
      }
    })
    .catch((err) =>{
      const responseData = err.response.data
      if(responseData.message){
        const responseErrors = responseData.errors;
        toast.error(responseData.message);
        if(responseErrors) {
          setErrors(responseErrors);
        }
      }
    })
    .finally(() => {
      setAddLoading(false)
    })
  }

  const nameChanged = (e) => {
    const val = e.target.value;
    setInputData(prevState => ({...prevState, name: val}));
  }

  const calorieChanged = (e) => {
    const val = e.target.value;
    if(isNaN(val))return;
    setInputData(prevState => ({...prevState, calorie: parseInt(val)}));
  }

  const timeChanged = (e) => {
    const val = e.target.value;
    setInputData(prevState => ({...prevState, time: val}));
  }

  return(
    <FoodFormStyles>
      <div className="title">Food</div>
      <form onSubmit={submitHandler}>
        <div className="form-input">
            <Input key="food-name" label="Name" type="text" onChange={nameChanged} value={inputData.name} error={errors.name} />
        </div>
        <div className="form-input">
            <Input key="food-calorie" label="Calorie" type="number" onChange={calorieChanged} value={inputData.calorie} error={errors.calorie} />
        </div>
        <div className="form-input">
            <Input key="food-time" label="Time" type="time" onChange={timeChanged} value={inputData.time} error={errors.time}/>
        </div>
        <div className="form-input buttons">
          <LoadingButton variant="outlined" type="submit"
            loading={addLoading} disabled={addLoading}>
            Add
          </LoadingButton>
        </div>
      </form>
    </FoodFormStyles>
  )
}

export default FoodForm;