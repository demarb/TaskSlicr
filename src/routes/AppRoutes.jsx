import { Route, Routes } from "react-router-dom";
import Login from '../pages/Login'
import Scheduler from '../pages/Scheduler'
import Profile from '../pages/Profile'
import PageNotFound from '../pages/PageNotFound'
import PrivateRoute from "../components/PrivateRoute";




export default function AppRoutes(){
    return (
        <>
            <Routes>
                <Route 
                    index 
                    element=
                    { 
                    <PrivateRoute>
                        <Scheduler /> 
                    </PrivateRoute>
                    }>
                </Route>
                <Route path="login" element={ <Login /> }/>
                {/* <Route path="profile" element={ <Profile /> }/>   */}
                <Route 
                    path="profile" 
                    element=
                    {
                    <PrivateRoute>
                        <Profile/>
                    </PrivateRoute> 
                    }>
                </Route>
                <Route path="*" element={<PageNotFound/>} ></Route>
            </Routes>
        </>
    )
}