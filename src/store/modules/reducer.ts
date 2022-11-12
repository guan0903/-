import {Anyaction,RootState,ListItem,tableItem} from "../../utils/index"
import {message} from "antd"
const initialState:RootState = {
  data:[],
  childrenData:[],
  userInfo:{},
  table_data:[]
}

export default (state = initialState, { type, payload }:Anyaction) => {
    let newState = JSON.parse(JSON.stringify(state))
  switch (type) {

    case "GET_LIST":
      newState.data = payload
      newState.childrenData = payload[0].children
      return { ...newState }
    case "SHOW_ITEM":
      newState.data.forEach((item:ListItem) => {
        if(item.id === payload.id){
          item.flag = !item.flag
        }
      })
      newState.childrenData = payload.children
      return newState
    case "FROM_LOGIN":
      newState.userInfo = payload.values
      return { ...newState }
        
    case "GET_TABLE":
        newState.table_data = payload
        return { ...newState }
    case "DEL_TABLE":
      newState.table_data.forEach((item:tableItem,index:number) => {
          if (item.key === payload.key) {
              newState.table_data.splice(index, 1)
              message.success("删除成功")
          }
      })
         return { ...newState }

      case "DEIT_TABLE":
          newState.table_data.forEach((item:tableItem,index:number) => {
              if (item.id === payload.id) {
                  newState.table_data[index] = {...payload}
              }
          })
          return { ...newState }
  default:
    return state
  }
}
