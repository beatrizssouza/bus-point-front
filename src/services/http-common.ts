import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {                  
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Authorization", 
    "Access-Control-Allow-Methods": "GET, POST , PUT, DELETE" ,
    "Content-Type": "application/json;charset=UTF-8"                   
},
});