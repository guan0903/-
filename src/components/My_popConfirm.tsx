import React from 'react'
import {Popconfirm,message,Button} from "antd"
import {useDispatch} from "react-redux"
import {del_table_data} from "../api/index"
import {RootDispatch,tableItem} from "../utils/index"

type Props = {
    title?:string,
    record:tableItem
}

const My_popConfirm = (props: Props) => {
    const dispatch:RootDispatch = useDispatch()
    const confirm = (record:tableItem) => {
        dispatch(del_table_data(record))
    };
      
    const cancel = () => {
        message.error('取消删除');
    };
  return <Popconfirm
        title={`确认${props.title}吗`}
        onConfirm={()=>confirm(props.record)}
        onCancel={cancel}
        okText="Yes"
        cancelText="No"
        >
            <Button >{props.title}</Button>
        </Popconfirm>
}


My_popConfirm.defaultProps={
    title:"删除"
}

export default My_popConfirm