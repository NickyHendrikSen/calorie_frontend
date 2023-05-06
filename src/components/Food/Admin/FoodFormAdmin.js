import Input from "../../Form/Input";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import { LoadingButton } from "@mui/lab";
import axiosClient from "../../../axiosClient";
import getDateFormat from "../../../utils/getDateFormat";
import { TextField } from "@material-ui/core";
import Autocomplete from '@mui/material/Autocomplete';
import { debounce } from "lodash";
import getTimeFromDate from "../../../utils/getTimeFromDate";

const FoodFormAdminStyles = styled.div`
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

const FoodFormAdmin = ({ refreshList }) => {
  
  const [ errors, setErrors ] = useState({
    name: "",
    calorie: "",
  })
  const [ inputData, setInputData ] = useState({
    name: "",
    calorie: 1,
    date: Date.now(),
    time: getTimeFromDate(Date.now())
  })
  const [ users, setUsers ] = useState([])
  const [ meals, setMeals ] = useState([])
  const [ userPicked, setUserPicked] = useState(null);
  const [ mealPicked, setMealPicked ] = useState(null);
  const [ addLoading, setAddLoading ] = useState(false);

  const clearErrors = () => {
    setErrors({
      name: "",
      calorie: "",
      date: "",
      time: "",
    })
  }

  const submitHandler = (e) => {
    e.preventDefault();

    if(userPicked == null){
      toast.error("Pick a user");
      return;
    }
    if(mealPicked == null){
      toast.error("Pick a meal");
      return;
    }
    setAddLoading(true);
    axiosClient.post("addDetailedFood", {
      name: inputData.name,
      calorie: inputData.calorie,
      meal_id: mealPicked.id,
      taken_at: getDateFormat(inputData.date, inputData.time)
    })
    .then((res) => {
      if(res.data.success){
        toast.success(res.data.message)
        refreshList();
        clearErrors();
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

  const searchUser = (value) => {
    axiosClient.post("searchUser", { search: value })
    .then((res) => {
      setUsers(res.data.users)
    })
  }

  const userInputChanged = debounce((e, newValue) => {
    searchUser(newValue)
  }, 500)

  const userInputPicked = (e, picked) => {
    const userId = picked.id;
    setUserPicked(picked)
    setMeals([])
    setMealPicked(null);
    axiosClient.get("getMealByUser?id=" + userId)
    .then((res) => {
      setMeals(res.data.meals)
    })
  }

  const mealInputPicked = (e, picked) => {
    setMealPicked(picked)
  }

  const dateChanged = (val) => {
    setInputData(prevState => ({...prevState, date: val}));
  }

  const timeChanged = (e) => {
    const val = e.target.value
    setInputData(prevState => ({...prevState, time: val}));
  }

  useEffect(() => {
    searchUser("");
  }, [])

  return(
    <FoodFormAdminStyles>
      <div className="title">Food</div>
      <form onSubmit={submitHandler}>
        <div className="form-input">
            <Input key="food-name" label="Name" type="text" onChange={nameChanged} value={inputData.name} error={errors.name} />
        </div>
        <div className="form-input">
            <Input key="food-calorie" label="Calorie" type="number" onChange={calorieChanged} value={inputData.calorie} error={errors.calorie} />
        </div>
        <div className="form-input">
            <Input type="date" onChange={dateChanged} value={inputData.date} label="Taken Date"/>
        </div>
        <div className="form-input">
            <Input type="time" onChange={timeChanged} value={inputData.time} label="Time"/>
        </div>
        <div className="form-input">          
          <Autocomplete
            disablePortal
            options={users}
            value={userPicked}
            onInputChange={userInputChanged}
            onChange={userInputPicked}
            isOptionEqualToValue={(option, value) => (option.name + " - " + option.email) === (value.name + " - " + value.email)}
            getOptionLabel={(option) => (option.name + " - " + option.email)}
            renderInput={(params) => <TextField {...params} label="User" />}
          />
        </div>
        <div className="form-input">          
          <Autocomplete
            disablePortal
            options={meals}
            value={mealPicked}
            disabled={userPicked == null}
            onChange={mealInputPicked}
            isOptionEqualToValue={(option, value) => option.name === value.name}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => <TextField {...params} label="Meal" />}
          />
        </div>
        <div className="form-input buttons">
          <LoadingButton variant="outlined" type="submit"
            loading={addLoading} disabled={addLoading}>
            Add
          </LoadingButton>
        </div>
      </form>
    </FoodFormAdminStyles>
  )
}

export default FoodFormAdmin;