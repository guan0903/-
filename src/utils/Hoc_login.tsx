import React ,{PropsWithChildren,ComponentType} from 'react'
import Cookies from 'js-cookie'
import {Navigate} from "react-router-dom"

const Hoc_login = (Com:ComponentType<object>) => {
  return (props:PropsWithChildren<object>) => {
    const flag = Cookies.get("token")
    if (!flag) {
        return <Navigate to={"/login"}/>
    }
    return <Com {...props}/>
  }
}

export default Hoc_login