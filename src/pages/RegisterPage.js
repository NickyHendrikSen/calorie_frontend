import { Avatar } from "@material-ui/core";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { toast } from "react-toastify";
import Input from "../components/Form/Input";
import { LoadingButton } from "@mui/lab";
import axiosClient from "../axiosClient";

const RegisterPageStyles = styled.div`
height: calc(100vh - 80px);
display: flex;
justify-content: center;
align-items: center;
.form{
  position: relative;
  border-radius: 10%;
  box-shadow: var(--drop-shadow);
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

const RegisterPage = () => {

  const [ errors, setErrors ] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [ name, setName ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ registerLoading, setRegisterLoading ] = useState(false);
  const navigate = useNavigate();

  const submitHandler = (e) =>{
    e.preventDefault();

    setRegisterLoading(true);
    axiosClient.post("register", 
      {
        name: name,
        email: email,
        password: password,
      }
    )
    .then((res) => {
      if(res.status === 200) {
        toast.success("REGISTER SUCCESS")
        navigate("/login");
      }
    })
    .catch((err) => {
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
      setRegisterLoading(false);
    })
  }

  const emailChanged = (e) => {
    const val = e.target.value;
    setEmail(val);
  }

  const nameChanged = (e) => {
    const val = e.target.value;
    setName(val);
  }

  const passwordChanged = (e) => {
    const val = e.target.value;
    setPassword(val);
  }

  return(
    <RegisterPageStyles>
      <div className="form" onSubmit={submitHandler}>
        <Avatar className="avatar"></Avatar>
        <div className="title">REGISTER</div>
        <form>
          <div className="form-input">
            <Input key="register-name" label="Name" type="text" onChange={nameChanged} value={name} error={errors.name || ""} />
          </div>
          <div className="form-input">
            <Input key="register-email" label="Email" type="text" onChange={emailChanged} value={email} error={errors.email || ""} />
          </div>
          <div className="form-input">
            <Input key="register-password" label="Password" type="password" onChange={passwordChanged} value={password} error={errors.password || ""} />
          </div>
          <div className="form-input">
            <LoadingButton variant="outlined" type="submit" color="inherit"
              loading={registerLoading} disabled={registerLoading}>
              Register
            </LoadingButton>
          </div>
        </form>
      </div>
    </RegisterPageStyles>
  )
}

export default RegisterPage;