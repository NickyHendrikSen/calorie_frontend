import axios from "axios";
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const config = {
  baseURL: process.env.REACT_APP_API_URL,  
  headers: {
    Authorization: {
      toString () {
        return `Bearer ${cookies.get("token")}`
      }
    }
  }
}
const axiosClient = axios.create(config)

export default axiosClient