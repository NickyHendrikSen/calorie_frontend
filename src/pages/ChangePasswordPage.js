import { Avatar } from "@material-ui/core";
import React, { useState } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import Input from "../components/Form/Input";
import { LoadingButton } from "@mui/lab";
import axiosClient from "../axiosClient";

const ChangePasswordPageStyles = styled.div`
height: calc(100vh - 80px);
display: flex;
justify-content: center;
align-items: center;
.form{
  position: relative;
  border-radius: 10%;
  box-shadow: var(--drop-shadow);
  // height: auto;
  width: 300px;
  padding: 30px;
  text-align: center;
  .avatar{
    background-color: var(--color-black);
    height: 60px;
    width: 60px;
    position: absolute;
    left: calc(50% - 30px);
    top: -30px;
  }
  .title{
    margin-top: 10px;
    font-size: 30px;
    font-weight: 500;
  }
  form{
    .form-input{
      margin: 25px auto;
      width: 90%;
      &:last-child{
        margin-top: 40px;
      }
    }
  }
}
`

const ChangePasswordPage = () => {

  const [ errors, setErrors ] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [ inputData, setInputData ] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [ buttonLoading, setButtonLoading ] = useState(false);

  const clearInput = () => {
    setInputData({
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    })
  }

  const clearErrors = () => {
    setErrors({
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    })
  }

  const submitHandler = (e) =>{
    e.preventDefault();

    setButtonLoading(true);
    axiosClient.post("changePassword",inputData)
    .then((res) => {
      if(res.data.success) {
        toast.success("Password Changed Successfully")
        clearInput();
        clearErrors();
      }
    })
    .catch((err) => {
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
      setButtonLoading(false);
    })
  }

  const oldPasswordChanged = (e) => {
    const val = e.target.value;
    setInputData(prevState => ({...prevState, oldPassword: val}));
  }
  
  const newPasswordChanged = (e) => {
    const val = e.target.value;
    setInputData(prevState => ({...prevState, newPassword: val}));
  }

  const confirmPasswordChanged = (e) => {
    const val = e.target.value;
    setInputData(prevState => ({...prevState, confirmPassword: val}));
  }

  return(
    <ChangePasswordPageStyles>
      <div className="form">
        <Avatar className="avatar"></Avatar>
        <div className="title">CHANGE PASSWORD</div>
        <form onSubmit={submitHandler}>
          <div className="form-input">
            <Input key="login-old-password" label="Old Password" type="password" onChange={oldPasswordChanged} value={inputData.oldPassword} error={errors.oldPassword} />
          </div>
          <div className="form-input">
            <Input key="login-new-password" label="New Password" type="password" onChange={newPasswordChanged} value={inputData.newPassword} error={errors.newPassword} />
          </div>
          <div className="form-input">
            <Input key="login-confirm-password" label="Confirm Password" type="password" onChange={confirmPasswordChanged} value={inputData.confirmPassword} error={errors.confirmPassword} />
          </div>
          <div className="form-input">
            <LoadingButton variant="outlined" type="submit" color="inherit"
              loading={buttonLoading} disabled={buttonLoading}>
              CHANGE PASSWORD
            </LoadingButton>
          </div>
        </form>
      </div>
    </ChangePasswordPageStyles>
  )
}

export default ChangePasswordPage;