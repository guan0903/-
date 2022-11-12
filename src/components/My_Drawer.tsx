import React,{useEffect} from 'react'
import { PlusOutlined } from '@ant-design/icons';
import {Drawer, Button, Select, Form, Input,InputNumber,Upload} from "antd"
import {tableItem,RootDispatch} from "../utils/index"
import {useDispatch} from "react-redux"
import {edit_table} from "../api/index"

const { Option } = Select;

type Props = {
    visible:boolean,
    onClose:any,
    edit_value:any 
}

const My_Drawer:React.FC<Props> = ({onClose,visible,edit_value}) => {
    const dispatch:RootDispatch =useDispatch()
    const [form] = Form.useForm()
    useEffect(()=>{
        console.log(edit_value);
        form.setFieldsValue({
            key:edit_value.key,
            name:edit_value.name,
            type:edit_value.type,
            price:edit_value.pirce
        })
    },[edit_value])
    const onFinish = (values: any) => {
        console.log('Success:', values);
        values.id = edit_value.id
        values.img = edit_value.img
        dispatch(edit_table(values))
        onClose()
    };
    
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
  return (
    <div>
        <Drawer destroyOnClose title="Basic Drawer" placement="right" onClose={onClose} visible={visible}
          >
        <Form
            name="basic"
            form={form}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            >
            <Form.Item
                label="Key"
                name="key"
                rules={[{ required: true, message: 'Please input your key!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: 'Please input your name!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Type"
                name="type"
                rules={[{ required: true, message: 'Please input your type!' }]}
            >
                 <Select
                    placeholder="请选择你的类型"
                    allowClear
                    >
                    <Option value="沙发">沙发</Option>
                    <Option value="衣柜">衣柜</Option>
                    <Option value="鞋柜">鞋柜</Option>
                </Select>
            </Form.Item>

            <Form.Item
                label="Price"
                name="price"
                initialValue={edit_value.price}
                rules={[{ required: true, message: 'Please input your price!' }]}
            >
                <InputNumber />
            </Form.Item>


            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                Submit
                </Button>
            </Form.Item>
        </Form>
      </Drawer>
    </div>
  )
}

export default My_Drawer