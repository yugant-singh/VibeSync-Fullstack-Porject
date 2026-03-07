import {createBrowserRouter,Route} from 'react-router-dom'

import Login from './features/auth/pages/Login'
import Register from './features/auth/pages/Register'
import Protected from './features/auth/components/Protected'
import Home from './features/home/pages/Home'
import Profile from './features/profile/pages/Profile'
import Scan from './features/scan/pages/Scan'
import History from './features/history/pages/History'
import Layout from './shared/components/layout/Layout'
import Results from './features/results/pages/Results'

 export const routes = createBrowserRouter([
    {
        path:'/login',  
       element:<Login/>
    },
    {
        path:'/register',
        element:<Register/>
    },
    {
        path:'/',
        element:<Protected><Layout/></Protected>,
        children:[
             { index: true, element: <Home /> },
             {path:'profile',element:<Profile/>},
             {path:'scan',element:<Scan/>},
             {path:'history',element:<History/>},
             {path:'results',element:<Results/>}
        ]
    }
])