import React ,{Suspense,FC} from 'react'
import routes from './Router_config'
import {
    BrowserRouter,
    Route,
    Routes,
    Navigate
} from "react-router-dom"
import {RouterItem,RouterList} from "../utils/index"
type Props = {
    
}

const RouterView:FC<Props> = (props) => {
    const renderRouter = (arr:RouterList) =>{
        return arr.map((item:RouterItem,index:number)=>{
            return <Route 
                key={index}
                path={item.path}
                element={item.to?<Navigate to={item.to}/>:<item.element/>}
            >
                {
                    item.children && renderRouter(item.children)
                }
            </Route>
        })
    }
  return (
    <Suspense fallback={<>路由加载中...</>}>
        <BrowserRouter >
            <Routes>
                <Route>
                    {
                        renderRouter(routes)
                    }
                </Route>
            </Routes>
        </BrowserRouter>
    </Suspense>
  )
}

export default RouterView