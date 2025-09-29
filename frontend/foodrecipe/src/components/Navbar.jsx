import React, { useEffect, useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import '../styles/navbar.css'
import Model from './model'
import Formdata from './Form'
const Navbar = () => {
  let [isopen,setopen] = useState(false);
  let token = localStorage.getItem("token")
  let [islogin , setlogin] = useState(token ? false : true);

  useEffect (()=>{
    setlogin(token ? false : true)
  },[token])
  const checkout = () =>{
    if(token){
      localStorage.removeItem("token");
      localStorage.removeItem("userdata");
      setlogin(true)
    }
    else{
      setopen(true)
    }
  }
  return (
    <>
    
    <div className='navbar'>
        <h1 className='left'>Foodies</h1>
        <ul className='right'>
            <NavLink to='/'>Home</NavLink>
            <NavLink to={!islogin ? 'favorites' : "/"} onClick={()=>islogin && setopen(true)}>Favorites</NavLink>
            <NavLink to={!islogin ? 'myrecipe': "/" } onClick={()=>islogin && setopen(true)}>my recipe</NavLink>

            <p onClick={checkout}>{(islogin) ? "Login" : "Logout"}</p>
        </ul>
    </div>
        {isopen && <Model onclose={()=>{setopen(false)}}><Formdata setopen={()=>setopen(false)}/></Model>}
    </>
  )
}

export default Navbar
