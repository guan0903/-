import React from 'react'
import { PageHeader } from 'antd';
import {useLocation,useNavigate} from "react-router-dom"
type Props = {}

const Details = (props: Props) => {
  const location:any = useLocation()
  const navigate = useNavigate()
  console.log(location);
  let {name } = location.state
  
  return (
    <div>
      <PageHeader
        className="site-page-header"
        onBack={() => navigate(-1)}
        title="返回"
        subTitle={`this is ${name}`}
      />
      <p>{name}</p>
    </div>
  )
}

export default Details