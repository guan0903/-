import axios from "axios"
import Cookies from "js-cookie"
import {Dispatch} from "redux"
import {ListItem,tableItem} from "../utils/index"
export let from_login = (values:object) =>{
    return async (dispatch :Dispatch)=>{
       let res =  await axios.get("/api/login",{params:values})
       console.log(res);
       if(res.status === 200){
          Cookies.set("token",res.data.token,{expires:1})
          dispatch({
            type:"FROM_LOGIN",
            payload:{
                data:res.data,
                values
            }
          })
       }
    } 
}
export let from_register = (values:object) =>{
    return async (dispatch :Dispatch)=>{
       let res =  await axios.get("/api/register",{params:values})
       console.log(res);
    } 
}
export let get_list = () =>{
    return async (dispatch:Dispatch)=>{
        let {data} = await axios.get("/api/list")
        dispatch({
            type:"GET_LIST",
            payload:data.list
        })
    }
}
export let show_item = (item:ListItem) =>{
    return {
        type:"SHOW_ITEM",
        payload:item
    }
}
export let get_table = () =>{
    return async (dispatch:Dispatch)=>{
        let {data} = await axios.get("/api/table")
        dispatch({
            type:"GET_TABLE",
            payload:data
        })
    }
}
export let del_table_data = (record:tableItem) =>{
    return {
        type:"DEL_TABLE",
        payload:record
    }
}

export let edit_table = (values:tableItem) =>{
    return {
        type:"DEIT_TABLE",
        payload:values
    }
}