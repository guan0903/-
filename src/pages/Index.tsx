import React ,{useEffect,useState} from 'react'
import {useDispatch,useSelector} from "react-redux"
import {get_list,show_item} from "../api/index"
import {RootDispatch,RootState,ListItem,Anyaction} from "../utils/index"

type Props = {}
let imgarr = [
  "https://img2.baidu.com/it/u=383380894,3933217319&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=333",
  "https://img2.baidu.com/it/u=2983827435,378917087&fm=253&fmt=auto&app=138&f=JPEG?w=374&h=500",
  "https://img1.baidu.com/it/u=153079648,553512087&fm=253&fmt=auto&app=138&f=JPEG?w=499&h=356",
  "https://img1.baidu.com/it/u=2658939207,2791674017&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500",
  "https://img2.baidu.com/it/u=1404596068,2549809832&fm=253&fmt=auto&app=120&f=JPEG?w=1067&h=800"
]
const Index = (props: Props) => {
  const dispatch:RootDispatch = useDispatch()
  const data = useSelector((state:RootState)=>state.data)
  const children_data = useSelector((state:RootState)=>state.childrenData)
  const [imgData,setImgData] = useState<string[]>(imgarr)
  useEffect(()=>{
    dispatch(get_list())
  },[])
  const add_active = (e: React.MouseEvent<HTMLDivElement, MouseEvent>,item:ListItem) =>{
    console.log("进入",item);
    dispatch(show_item((item)))
  }
  const del_active = (e: React.MouseEvent<HTMLDivElement, MouseEvent>,item:ListItem) =>{
    console.log("离开",item);
    dispatch(show_item((item)))
  }

  return (
    <div>
      <nav>* 导航栏</nav>
      <div className='content' style={{width:"1050px",height:"500px",display:"flex"}}>
        <div className='left' style={{width:"250px",height:"100%"}}>
          {
            data&&data.length>0?data.map((item:ListItem,index:number)=>{
              return <div 
              className={item.flag?"actives":""} 
              key={index} 
              onMouseEnter={(e)=>add_active(e,item)}
              onMouseLeave={(e)=>del_active(e,item)}
    
              style={{
                height:"50px",
                lineHeight:"50px",
                textAlign:"left",
                display:"flex",
                justifyContent:"space-around",
                }}>
                <div></div>
                <div style={{width:"100px"}}>
                  {item.title}
                </div>
                <div> &gt; </div>
              </div>
            }):"没有数据"
          }
        </div>
        <div className='right' style={{width:"800px",height:"100%"}} >
          {
            children_data&&children_data.length>0?children_data.map((item:Anyaction,index:number)=>{
              return <div key={index} style={{width:"150px",paddingLeft:"40px",paddingTop:"20px"}}>
                <div>{item.title}</div>
                <img src={item.img} alt="图片错误" />
              </div>
            }):"没有数据"
          }
        </div>
      </div>
      {/* 瀑布流 */}
      <div className='macy_content' style={{width:"1050px",columnCount:4}}>
          {
            imgData.map((item:string,index:number)=>{
              return <div key={index} style={{width:"300px",height:"400px"}}>
                 <img width={300} height={400}  src={item} alt="" />
              </div>
            })
          }
          <button onClick={()=>{
            setImgData([...imgData.concat(imgData)])
          }}>加载图片</button>
      </div>
    </div>
  )
}

export default Index