import React ,{useState,useEffect} from 'react'
import AMapLoader from '@amap/amap-jsapi-loader';
type Props = {}

const My_map = (props: Props) => {
    const [map,setMap] = useState<object>({})
    // 2.dom渲染成功后进行map对象的创建
    useEffect(()=>{
        AMapLoader.load({
            key:"5a7b65fa068706e0bc8da459dfb05672",  // 申请好的Web端开发者Key，首次调用 load 时必填
            version:"2.0",              // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
            plugins:[''],               // 需要使用的的插件列表，如比例尺'AMap.Scale'等
        }).then((AMap)=>{
            setMap(new AMap.Map("container",{ //设置地图容器id
                viewMode:"3D",         //是否为3D地图模式
                zoom:5,                //初始化地图级别
                center:[105.602725,37.076636], //初始化地图中心点位置
            }))
        }).catch(e=>{
            console.log(e);
        })
    },[])

    console.log(map);
  return (
    <div id="container" className="map" style={{ height: '800px' ,margin:"0",padding:"0",width:"100%"}} > 
        </div>
  )
}

export default My_map