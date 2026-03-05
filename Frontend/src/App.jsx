// import { FaceDetector } from "@mediapipe/tasks-vision";
// import FaceExpression from "./features/expression/components/FaceExpression";
import {routes} from './auth.routes'
import {RouterProvider} from 'react-router-dom'
import {AuthProvider} from './features/auth/auth.context.jsx'
import '../src/style.scss'





function App() {
  return ( 
 
   <AuthProvider>
     <RouterProvider router = {routes}/>
   </AuthProvider>

  )
}

export default App;