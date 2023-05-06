import React, { useContext } from "react";
import { NavLink, useNavigate  } from "react-router-dom"
import styled from "styled-components"
import AuthContext from "../../store/auth-context";

const HeaderStyles = styled.header`
background-color: var(--color-white);
height: 80px;
width: 100%;
box-shadow: var(--drop-shadow);
.header{
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding: 0 30px;
  &__title{
    font-size: 30px;
    font-weight: bold;
    a{
      color: var(--color-black);
      text-decoration: none;
      outline: none;
    }
  }
  &__menu{
    .item{
      color: var(--color-black);
      text-decoration: none;
      display: inline-block;
      padding: 5px;
      margin: 0 5px;
      transition-duration: .3s;
      border-bottom: 1px solid transparent;
      cursor: pointer;
      outline: none;
      &:hover{
        border-bottom: 1px solid var(--color-black);
      }
    }
    .active{
      border-bottom: 1px solid var(--color-black);
    }
  }
}
`

const Header = () => {

  const authContext = useContext(AuthContext);
  const isLoggedIn = authContext.isLoggedIn;
  const isAdmin = authContext.isAdmin;
  const navigate = useNavigate();
  
  const logoutHandler = () => {
    authContext.logout();
    navigate('/');
  }

  return (
    <HeaderStyles>
      <div className="header">
        <div className="header__title">
          <NavLink to="/">Calorie App</NavLink>
        </div>
        <div className="header__menu">
          {
            !isLoggedIn &&
              <>
                <NavLink to="/login" className="item">Login</NavLink>
                <NavLink to="/register" className="item">Register</NavLink>
              </>
          }
          {
            isLoggedIn && isAdmin &&
              <>
                <NavLink to="/all-food" className="item">All Foods</NavLink>
                <NavLink to="/report" className="item">Report</NavLink>
              </>
          }
          {
            isLoggedIn &&
              <>
                <NavLink to="/meal" className="item">My Meals</NavLink>
                <NavLink to="/food" className="item">My Foods</NavLink>
                <NavLink to="/change-password" className="item">Change Password</NavLink>
                <span className="item" onClick={logoutHandler}>Logout</span>
              </>
          }
        </div>
      </div>
    </HeaderStyles>
  )
}

export default Header;