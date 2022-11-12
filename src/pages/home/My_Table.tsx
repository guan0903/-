import React ,{useEffect,useState} from 'react'
import {get_table,del_table_data} from '../../api/index'
import { Space, Table, Image, Button,Popconfirm,Drawer} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {useDispatch,useSelector} from "react-redux"
import {RootDispatch,RootState,tableItem} from "../../utils/index"
import {useNavigate} from "react-router-dom"
import My_popConfirm from "../../components/My_popConfirm"
import My_Drawer from "../../components/My_Drawer"

type Props = {}

const My_Table: React.FC  = (props: Props) => {
  const [visible, setVisible] = useState(false);
  const [edit_value,setEdit_value] = useState<object>({})
 
  const dispatch:RootDispatch = useDispatch()
  const navigate = useNavigate()
  const table_data = useSelector((state:RootState)=>state.table_data)

  const columns: ColumnsType<tableItem> = [
    {
      title: 'Key',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: '商品图片',
      dataIndex: 'img',
      key: 'img',
      render:(_,record)=>{
        return <Image height={50} src={record.img}/>
      }
    },
    {
      title: '商品名称',
      dataIndex: 'name',
      key: 'name',
      render: text => <a>{text}</a>,
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: '商品价格',
      dataIndex: 'price',
      key: 'price',
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={()=>gotoDetails(record)}>详情</a>
          <Button onClick={()=>showDrawer(record)}>edit </Button>
          <My_popConfirm title="删除" record={record}/>
        </Space>
      ),
    },
  ];
  useEffect(()=>{
    dispatch(get_table())
  },[dispatch])

  const gotoDetails = (record:tableItem) =>{
    navigate("/home/details/"+record.key,{state:record})
  }

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: tableItem[]) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: (record: tableItem) => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name,
    }),
  };
  const showDrawer = (record:tableItem) => {
    setEdit_value(record)
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };
  let my_drawer = {
    visible,
    onClose,
    edit_value
  }
  return (
    <div><Table
    rowSelection={{
      type: "checkbox",
      ...rowSelection,
    }}
     pagination={{pageSize:5}} columns={columns} dataSource={table_data} />
      
      <My_Drawer {...my_drawer}/>
    </div>
  )
}

export default My_Table