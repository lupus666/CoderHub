import axios from 'axios'
import auth from "@/utils/auth";
function getAuthorization() {
  if (auth.getUser().token === undefined){

  }else {
    return {'Authorization': "Bearer "+ auth.getUser().token}
  }
}
const service = axios.create(({
  // baseURL: 'http://192.168.135.128:7300/mock/5dd6c9eacc546d0b141fb290',
  baseURL: 'http://106.54.231.68:9012',
  // baseURL: 'http://192.168.31.188:9003',
  timeout: 3000,
  headers:getAuthorization()
}));
export default service;
