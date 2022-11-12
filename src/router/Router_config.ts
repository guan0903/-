import {lazy} from "react"
import {RouterList} from "../utils/index"
export let mainRouter:RouterList = [
    {
        path:"/home/home_about",
        element:lazy(()=>import("../pages/home/Home_about")),
        title:"首页看版",
        meta:true
    },
    {
        path:"/home/my_table",
        element:lazy(()=>import("../pages/home/My_Table")),
        title:"表格",
        meta:true
    },
    {
        path:"/home/details/:id",
        element:lazy(()=>import("../pages/home/Details")),
        title:"详情",
        meta:false
    }
]
const routes:RouterList = [
    {
        path:"/",
        to:"/home"
    },
    {
        path:"/index",
        element:lazy(()=>import("../pages/Index"))
    },
    {
        path:"/login",
        element:lazy(()=>import("../pages/Login"))
    },
    {
        path:"*",
        element:lazy(()=>import("../pages/Eorry404"))
    },
    {
        path:"/my_map",
        element:lazy(()=>import("../pages/My_map"))
    },
    {
        path:"/home",
        element:lazy(()=>import("../pages/Home")),
        children:mainRouter
    },
]

export default routes