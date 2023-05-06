import { Box } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { SiGoogleanalytics } from "react-icons/si"
import styled from "styled-components";
import axiosClient from "../../axiosClient";
import AverageCalories from "../../components/Report/AverageCalories";
import FoodEntries from "../../components/Report/FoodEntries";
import AuthContext from "../../store/auth-context";

const ReportPageStyles = styled.div`
padding: 25px;
.title{
  font-size: 30px;
  font-weight: 500;
}
.reports{
  & > div{
    margin-right: 25px;
  }
}
`

const ReportPage = () => {

  const authContext = useContext(AuthContext);
  const authToken = authContext.token
  const [ foodEntries, setFoodEntries ] = useState({
    amount: '0',
    percentage: 'inf'
  })
  const [ avgCalories, setAvgCalories ] = useState(0);

  useEffect(() => {
    axiosClient.get("getReport")
      .then((res) =>{
        if(res.data.success){
          setFoodEntries(res.data.entries)
          setAvgCalories(res.data.average)
        }
      })
  }, [authToken])

  return(
    <ReportPageStyles>
      <h1 className="title">
        Admin Report <SiGoogleanalytics size={25} color="var(--color-orange)"/>
      </h1>
      <Box className="reports">
        <FoodEntries amount={foodEntries.amount} percentage={foodEntries.percentage} current={foodEntries.current}/>
        <AverageCalories amount={avgCalories} />
      </Box>
    </ReportPageStyles>
  )
}

export default ReportPage;