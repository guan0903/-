import {JSXElement} from "react"
import store from "../store"
export type RouterList = Array<RouterItem>

export type RouterItem = {
    path:string,
    to?:string,
    element?:JSXElement,
    children?:RouterList,
    title?:string,
    meta?:boolean
}
export type Anyaction = any
export type RootDispatch = typeof store.dispatch
export type userInfo = {
    username?:string,
    password?:string
}

export type RootState = {
    data:Array<ListItem>
    childrenData:Array<ListItem>
    userInfo:userInfo,
    table_data:Array<tableItem>
}
export type tableItem = {
    id:string,
    key:string,
    img:string,
    name:string,
    type:string,
    price:number
}
export type ListItem = {
    id:string,
    title:string,
    children?:ListItem[],
    img?:string,
    flag?:boolean
}