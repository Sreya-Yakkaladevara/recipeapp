// import './App.css';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Home from './pages/Home';
import axios from 'axios'
import Addrecipe from './components/Addrecipe';
import Mainpage from './components/Mainpage';
import Editrecipe from './components/Editrecipe';
import Recipedetails from './components/recipedetails';
const loader = async () =>{
  let allrecipe = [];
  await axios.get("http://localhost:5000",{headers:{"Authorization":'bearer '+localStorage.getItem("token")}}).then((res)=> allrecipe = res.data.message)
  return allrecipe
}
const addrecipe = async () =>{
  const user= JSON.parse(localStorage.getItem("userdata"));
  const allrecipe = await loader()
  return allrecipe.filter((items)=> items.createdBy === user._id)
}

const favrecipe = async () =>{
 return await JSON.parse(localStorage.getItem("fav"));
  
}
const router = createBrowserRouter([
    {path:'/',
      element:<Mainpage></Mainpage>,
      children :[  {
    path:"/",
    element:<Home/>,
    loader : loader,
  },
  {
    path:"myrecipe",
    element:<Home/>,
    loader : addrecipe
  },
  {
    path:"favorites",
    element:<Home/>,
    loader : favrecipe
  },
  {
    path:"edit/:id",
    element:<Editrecipe/>
  },
  {
    path:"addrecipe",
    element:<Addrecipe/>
  }
  ,
  {
    path:"recipedetails/:id",
    element:<Recipedetails/>,
  }]
    }
])
function App() {
  return (
  
      <RouterProvider router={router}/>

  );
}

export default App;
