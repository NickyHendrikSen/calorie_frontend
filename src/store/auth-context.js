import { createContext, useState } from "react";
import Cookies from 'universal-cookie';


const authData = {
  token: '',
  isLoggedIn: false,
  isAdmin: false, 
  login: (token, expiresIn) => {},
  logout: () => {},
}
const COOKIE_NAME = "token"
const ADMIN_NAME = "isAdmin"

const AuthContext = createContext(authData)

export const AuthContextProvider = ({children}) => {

  const cookies = new Cookies();
  const initialToken = cookies.get(COOKIE_NAME) || null
  const initialAdmin = localStorage.getItem(ADMIN_NAME) || false
  const [ token, setToken ] = useState(initialToken);
  const [ isAdmin, setIsAdmin ] = useState(initialAdmin)

  const onLogin = (t, expiresIn, admin) => {
    cookies.set(COOKIE_NAME, t, {
      path: '/',
      maxAge: expiresIn,
      secure: true,
    })
    localStorage.setItem(ADMIN_NAME, admin)
    setToken(t)
    setIsAdmin(admin)
  }

  const onLogout = () => {
    cookies.remove(COOKIE_NAME)
    localStorage.removeItem(ADMIN_NAME)
    setToken(null);
    setIsAdmin(false);
  }

  const contextVal = {
    token: token,
    isLoggedIn: !token ? false : true,
    isAdmin: !!+isAdmin,
    login: onLogin,
    logout: onLogout,
  }

  return(
    <AuthContext.Provider value={contextVal}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext;