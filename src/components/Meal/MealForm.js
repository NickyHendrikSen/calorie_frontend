import Input from "../Form/Input";
import React, { useState } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import { LoadingButton } from "@mui/lab";
import axiosClient from "../../axiosClient";
import FormSwitch from "../Form/FormSwitch";

const MealFormStyles = styled.div`
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

const MealForm = ({ refreshList, mealId, takenAt }) => {
  
  const [ errors, setErrors ] = useState({
    name: "",
    has_maximum: "",
    maximum: "",
  })
  const [ inputData, setInputData ] = useState({
    name: "",
    has_maximum: false,
    maximum: 0,
  })
  const [ addLoading, setAddLoading ] = useState(false);

  const clearInput = () => {
    setInputData({
      name: "",
      has_maximum: false,
      maximum: 0,
    })
    setErrors({
      name: "",
      has_maximum: "",
      maximum: "",
    })
  }

  const submitHandler = (e) => {
    e.preventDefault();

    setAddLoading(true);
    axiosClient.post("addMeal", inputData)
    .then((res) => {
      if(res.data.success){
        toast.success(res.data.message)
        clearInput();
        refreshList();
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

  const maximumChanged = (e) => {
    const val = e.target.value;
    setInputData(prevState => ({...prevState, maximum: parseInt(val)}));
  }

  const hasMaximumChanged = (e) => {
    const val = e.target.checked;
    setInputData(prevState => ({...prevState, has_maximum: val}));
  }

  return(
    <MealFormStyles>
      <div className="title">Meal</div>
      <form onSubmit={submitHandler}>
        <div className="form-input">
            <Input key="food-name" label="Name" type="text" onChange={nameChanged} value={inputData.name} error={errors.name} />
        </div>
        <div className="form-input">
          <FormSwitch label="Has Maximum" onChange={hasMaximumChanged} checked={inputData.has_maximum} />
        </div>
        {inputData.has_maximum &&
          <div className="form-input">
              <Input key="meal-maximum" label="Maximum Food Entries" type="number" onChange={maximumChanged} value={inputData.maximum} error={errors.maximum} />
          </div>
        }
        <div className="form-input buttons">
          <LoadingButton variant="outlined" type="submit" color="info"
            loading={addLoading} disabled={addLoading}>
            Add
          </LoadingButton>
        </div>
      </form>
    </MealFormStyles>
  )
}

export default MealForm;