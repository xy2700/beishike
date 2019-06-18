import request from "./http"
import axios from "../../mock/mock";

class Apls{
   /* 首页 */
    GetList(data){
        return request({
            method:"get",
            url:"/json1811.ashx",
            params:data
        })
    }
    mokeLogin(data){
        return axios.post("/login",data)
    }
}
export default new Apls();