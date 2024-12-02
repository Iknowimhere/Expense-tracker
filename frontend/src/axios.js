import axios from "axios";

let instance=axios.create({
  baseURL: 'https://expense-tracker-3x4e.onrender.com/api',
}); 

export default instance;