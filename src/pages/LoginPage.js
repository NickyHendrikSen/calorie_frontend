import { Avatar } from "@material-ui/core";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { toast } from "react-toastify";
import Input from "../components/Form/Input";
import AuthContext from "../store/auth-context";
import { LoadingButton } from "@mui/lab";
import axiosClient from "../axiosClient";

const LoginPageStyles = styled.div`
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

const LoginPage = () => {

  const [ errors, setErrors ] = useState({
    email: "",
    password: "",
  });
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ loginLoading, setLoginLoading ] = useState(false);
  const navigate = useNavigate();

  const authContext = useContext(AuthContext)

  const submitHandler = (e) =>{
    e.preventDefault();

    setLoginLoading(true);
    axiosClient.post("login", 
      {
        email: email,
        password: password,
      }
    )
    .then((res) => {
      if(res.data.access_token) {
        authContext.login(res.data.access_token, res.data.expires_in, res.data.is_admin)
        toast.success("LOGIN SUCCESS")
        navigate("/food")
      }
      else if(res.status === 401){
        toast.error("User not found")
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
      setLoginLoading(false);
    })
  }

  const emailChanged = (e) => {
    const val = e.target.value;
    setEmail(val);
  }
  
  const passwordChanged = (e) => {
    const val = e.target.value;
    setPassword(val);
  }

  return(
    <LoginPageStyles>
      <div className="form">
        <Avatar className="avatar"></Avatar>
        <div className="title">LOGIN</div>
        <form onSubmit={submitHandler}>
          <div className="form-input">
            <Input key="login-email" label="Email" type="text" onChange={emailChanged} value={email} error={errors.email} />
          </div>
          <div className="form-input">
            <Input key="login-password" label="Password" type="password" onChange={passwordChanged} value={password} error={errors.password} />
          </div>
          <div className="form-input">
            <LoadingButton variant="outlined" type="submit" color="inherit"
              loading={loginLoading} disabled={loginLoading}>
              LOGIN
            </LoadingButton>
          </div>
        </form>
      </div>
    </LoginPageStyles>
  )
}

export default LoginPage;