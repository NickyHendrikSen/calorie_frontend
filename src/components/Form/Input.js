import { TextField } from "@material-ui/core";
import { DatePicker } from "@mui/lab";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import React from "react";
import styled from "styled-components"

const InputStyles = styled.div`
width: 100%;
.input{
  width: 100%;
}
& > div{
  width: 100%;
}
.error{
  text-align: left;
  color: red;
  font-size: 12px;
}
`

const Input = ({ label = "", type = "text", className = "", error = "", onChange, value, disabled = false }) => {

  if(type === "date"){
    return (
      <InputStyles className={className}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker label={label} onChange={onChange} value={value}
            disabled={disabled}
            mask="____-__-__"
            inputFormat="yyyy-MM-dd"
            renderInput={(params) => <TextField {...params} />} />
          {error !== "" && <div className="error">{error}</div>}
        </LocalizationProvider>
      </InputStyles>
    )
  }
  return (
    <InputStyles className={className}>
      <TextField label={label} type={type} onChange={onChange} value={value} 
        className="input" />
      {error !== "" && <div className="error">{error}</div>}
    </InputStyles>
  )
}

export default Input;