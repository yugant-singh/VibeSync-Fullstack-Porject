import {createBrowserRouter,Route} from 'react-router-dom'
import Login from './features/auth/pages/Login'
import Register from './features/auth/pages/Register'
 export const routes = createBrowserRouter([
    {
        path:'/login',
       element:<Login/>
    },
    {
        path:'/register',
        element:<Register/>
    },{
        path:'/',
        element:<main><h1>WelCome To the VibeSync</h1></main>
    }
])