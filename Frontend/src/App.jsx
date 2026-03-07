// import { FaceDetector } from "@mediapipe/tasks-vision";
// import FaceExpression from "./features/expression/components/FaceExpression";
import {routes} from './auth.routes'
import {RouterProvider} from 'react-router-dom'
import {AuthProvider} from './features/auth/auth.context.jsx'
import './style.scss'
import { SongContextProvider } from './features/scan/song.context.jsx'





function App() {
  return ( 
 
   <AuthProvider>
  <SongContextProvider>
       <RouterProvider router = {routes}/>
  </SongContextProvider>
   </AuthProvider>

  )
}

export default App;