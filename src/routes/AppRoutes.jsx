import { Route, Routes } from "react-router-dom";
import Login from '../pages/Login'
import Scheduler from '../pages/Scheduler'
import Profile from '../pages/Profile'
import PageNotFound from '../pages/PageNotFound'




export default function AppRoutes(){
    return (
        <>
            <Routes>
                <Route index element={ <Scheduler /> }/>
                <Route path="login" element={ <Login /> }/>
                <Route path="profile" element={ <Profile /> }/>  
                <Route path="*" element={<PageNotFound/>} ></Route>
            </Routes>
        </>
    )
}