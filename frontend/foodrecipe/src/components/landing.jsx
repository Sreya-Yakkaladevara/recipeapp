import React, { useState } from 'react'
import "../styles/landing.css";
import foodrecipe from '../assets/foodrecipe.jpg'
import { NavLink, useNavigate } from 'react-router-dom';
import Model from './model';
import Formdata from './Form';
const Landing = () => {
  const [isopen,setopen] = useState('false')
  const navigate = useNavigate();
  const addrecipe = () =>{
    const token = localStorage.getItem("token");
    if(token){
      navigate("/addrecipe")
    }
    else{
      setopen(true)
    }
  }
  return (
    <>
        <section className='container'>
            <div className='left'>
                <h1 className='heading'>Food recipes</h1>
                <p className='para'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolore nihil deleniti rem. Eum dolores minus ipsa dicta, nobis, ut pariatur ex deleniti, itaque soluta corrupti nemo sint delectus asperiores aut.</p>
               <button className='recipebutton' onClick={addrecipe} >Share your recipe</button>
            </div>
            <div className='right'>
                <img src={foodrecipe} height='200px' width='300px' className='image'></img>
            </div>
              {isopen && <Model onclose={()=>{setopen(false)}}><Formdata setopen={()=>setopen(false)}/></Model>}
        </section>
        
    </>
    
  )
}

export default Landing
