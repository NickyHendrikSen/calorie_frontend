import Input from "../Form/Input";
import React, { useState } from "react";
import styled from "styled-components";
import { LoadingButton } from '@mui/lab';
import { toast } from "react-toastify";
import axiosClient from "../../axiosClient";
import FormSwitch from "../Form/FormSwitch";

const MealEditStyles = styled.div`
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

const MealEdit = ({ meal, refreshList }) => {
  
  const [ deleteLoading, setDeleteLoading ] = useState(false);
  const [ editLoading, setEditLoading ] = useState(false);
  const [ errors, setErrors ] = useState({
    name: "",
    has_maximum: "",
    maximum: ""
  })
  const [ inputData, setInputData ] = useState({
    id: meal.id,
    name: meal.name || "",
    has_maximum: meal.has_maximum || false,
    maximum: meal.maximum || 1
  })

  const deleteHandler = (e) => {
    e.preventDefault();

    setDeleteLoading(true);
    axiosClient.post("deleteMeal", {id: inputData.id}, )
    .then((res) => {
      if(!res.data.success){
        toast.error(res.data.message)
      }
      else{
        toast.success(res.data.message)
        refreshList();
      }
    })
    .catch(() =>{
      toast.error("Failed to delete")
    })
    .finally(() => {
      setDeleteLoading(false);
    })
  }

  const editHandler = (e) => {
    e.preventDefault();

    setEditLoading(true);
    axiosClient.post("editMeal", inputData)
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

  const maximumChanged = (e) => {
    const val = e.target.value;
    setInputData(prevState => ({...prevState, maximum: parseInt(val)}));
  }

  const hasMaximumChanged = (e) => {
    const val = e.target.checked;
    setInputData(prevState => ({...prevState, has_maximum: val}));
  }

  return(
    <MealEditStyles>
      <div className="title">Meal</div>
      <div className="form-input">
          <Input key="meal-name" label="Name" type="text" onChange={nameChanged} value={inputData.name} error={errors.name} />
      </div>
      <div>
          <FormSwitch label="Has Maximum" onChange={hasMaximumChanged} checked={inputData.has_maximum} />
      </div>
      {inputData.has_maximum &&
        <div className="form-input">
            <Input key="meal-maximum" label="Maximum Food Entries" type="number" onChange={maximumChanged} value={inputData.maximum} error={errors.maximum} />
        </div>
      }
      <div className="form-input">
        <LoadingButton variant="outlined" type="submit" color="info" onClick={editHandler}
          loading={editLoading} disabled={editLoading || deleteLoading}>
          Edit
        </LoadingButton>
        <LoadingButton variant="outlined" type="submit" color="secondary" onClick={deleteHandler}
          loading={deleteLoading} disabled={editLoading || deleteLoading}>
          Delete
        </LoadingButton>
      </div>
    </MealEditStyles>
  )
}

export default MealEdit;