import { Fragment, useContext } from "react"
import Header from './components/Layout/Header';
import { Route, Routes, Navigate } from 'react-router-dom'
import { createGlobalStyle } from "styled-components";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import FoodPage from "./pages/FoodPage";
import ReportPage from "./pages/Admin/ReportPage";
import AuthContext from "./store/auth-context";
import HomePage from "./pages/HomePage";
import AdminFoodPage from "./pages/Admin/AdminFoodPage";
import MealPage from "./pages/MealPage";  
import InviteFriend from "./components/Layout/InviteFriend"
import Footer from "./components/Layout/Footer";
import LayoutContainer from "./components/Layout/LayoutContainer";
import ChangePasswordPage from "./pages/ChangePasswordPage";

const GlobalStyles = createGlobalStyle`
  html {
    --color-white: #fff;
    --color-black: #000;
    --color-orange: #f9ab00;
    --color-green: #008000;
    --color-grey: #E9E9E9;
    --drop-shadow: 2px 2px 5px .5px #000000;
  }
`;

const App = () => {
  const authContext = useContext(AuthContext);

  return (
    <Fragment>
      <GlobalStyles />
      <Header />
      <LayoutContainer>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {
            !authContext.isLoggedIn &&
            <>
              <Route path="/login" element={<LoginPage />}></Route>
              <Route path="/register" element={<RegisterPage />}></Route>
            </>
          }
          {
            authContext.isLoggedIn &&
            <>
              <Route path="/change-password" element={<ChangePasswordPage />}></Route>
              <Route path="/meal" element={<MealPage />}></Route>
              <Route path="/food" element={<FoodPage />}></Route>
            </>
          }
          {
            authContext.isLoggedIn && authContext.isAdmin &&
            <>
              <Route path="/all-food" element={<AdminFoodPage />}></Route>
              <Route path="/report" element={<ReportPage />}></Route>
            </>
          }
          <Route path="*"
            element={<Navigate to="/" />}>
          </Route>
        </Routes>
      </LayoutContainer>
      <InviteFriend />
      <Footer />
      <ToastContainer theme="colored"/>
    </Fragment>
  );
}

export default App;
