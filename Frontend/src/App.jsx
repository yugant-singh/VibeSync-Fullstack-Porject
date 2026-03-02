// import { FaceDetector } from "@mediapipe/tasks-vision";
// import FaceExpression from "./features/expression/components/FaceExpression";
import {routes} from './auth.routes'
import {RouterProvider} from 'react-router-dom'
import '../src/style.scss'
import {AuthProvider} from '../src/features/auth/auth.context'




function App() {
  return ( 
   <AuthProvider>
    <RouterProvider router = {routes}/>
   </AuthProvider>
  )
}

export default App;