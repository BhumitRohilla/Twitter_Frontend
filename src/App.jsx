import { useEffect, useState} from 'react'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import AuthContext from './Context/AuthContext'
import Navbar from './Components/Navbar/index'
import Twitter from './Pages/MainPage/Twitter'
import LoginPopUp from './Components/LoginPopUp/index';
import './App.css'  

function App() {
  
  //useEffect
  useEffect(()=>{
    const token = 'test';
  },[]);

  //useState
  const [user,setUser] = useState({});
  const [login,setLogin] = useState(true);
  const [register,setReg] = useState(false);
  

  const router = createBrowserRouter([
    {
      path:'/',
      element: <Navbar/>,
      children: [
        {
          path: "explore",
          element: <Twitter/>,
        },
      ],
    }
  ])


  
  return (
    <div>
      <LoginPopUp isOpen = {login} handleClose = {()=>{setLogin(false)}}/>
      <AuthContext.Provider value={{user,setUser}}>
          <RouterProvider router={router} />
      </AuthContext.Provider>
    </div>  
  )
}

export default App
