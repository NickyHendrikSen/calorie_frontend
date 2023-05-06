import React, { useState } from "react";
import { Popover, Button } from '@mui/material';
import axiosClient from "../../axiosClient"
import { toast } from "react-toastify"
import styled from "styled-components"
import Input from "../Form/Input";
import { LoadingButton } from "@mui/lab";

const InviteFriendStyles = styled.div`
.popover{
  position: fixed;
  bottom: 10px;
  right: 10px;
  background-color: var(--color-black);
  &:hover{
    background-color: var(--color-white);
    box-shadow: var(--drop-shadow);
    color: var(--color-black);
  }
}
`

const InviteFriendModalStyles = styled.div`
width: 300px;
height: auto;
padding: 25px;
.title{
  font-size: 20px;
  font-weight: 500;
}
.form-input{
  margin-top: 10px;
  &:last-child{
    margin-top: 20px;
  }
}
.token{
  background-color: #c7ffc8;
  border: 1px solid #6ad96c;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  margin-top: 10px;
  color: var(--color-black);
  cursor: pointer;
  &:hover{
    opacity: 0.6;
  }
  &:active{
    opacity: 1;
  }
}
`

const InviteFriend = () => {
  const [ anchorEl, setAnchorEl ] = useState(null);
  const [ token, setToken ] = useState("");
  const [ loading, setLoading ] = useState(false);
  const [ inputData, setInputData ] = useState({
    name: "",
    email: "",
  })
  const [ errors, setErrors ] = useState({
    name: "",
    email: "",
  })

  const clearError = () => {
    setErrors({
      name: "",
      email: "",
    })
  }
  
  const clearInput = () => {
    setInputData({
      name: "",
      email: "",
    })
    setToken("");
  }

  const inviteFriend = (e) => {
    e.preventDefault();
    setLoading(true);
    axiosClient.post("inviteFriend", inputData)
    .then((res) => {
      if(res.data.success){
        setToken(res.data.token)
        toast.success("Please share this token to your friend")
        clearError();
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
      setLoading(false);
    })
  }

  const nameChanged = (e) => {
    const val = e.target.value;
    setInputData(prevState => ({...prevState, name: val}));
  }

  const emailChanged = (e) => {
    const val = e.target.value;
    setInputData(prevState => ({...prevState, email: val}));
  }

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    clearInput();
  };

  const copyToken = () => {
    toast.info("Token has been copied to clipboard")
    navigator.clipboard.writeText(token)
  }

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  return (
    <InviteFriendStyles>
      <Button aria-describedby={id} variant="contained" onClick={handleClick} className="popover">
        Invite a friend
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        disableScrollLock={true}
      >
        <InviteFriendModalStyles>
          <div className="title">Invite a friend</div>
          <form onSubmit={inviteFriend}>
            <div className="form-input">
              <Input label="Name" type="text" onChange={nameChanged} value={inputData.name} error={errors.name} />
            </div>
            <div className="form-input">
              <Input label="Email" type="text" onChange={emailChanged} value={inputData.email} error={errors.email} />
            </div>
            { token &&
              <div className="token" onClick={copyToken}>
                TOKEN : {token}
              </div>
            }
            <div className="form-input">
              <LoadingButton variant="outlined" type="submit"
                loading={loading} disabled={loading}>
                Invite
              </LoadingButton>
            </div>
          </form>
        </InviteFriendModalStyles>
      </Popover>
    </InviteFriendStyles>
  )
}

export default InviteFriend;