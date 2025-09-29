import axios from 'axios'
import React, { useState } from 'react'
import { Form, Navigate, useNavigate } from 'react-router-dom'
import '../styles/addrecipe.css'
const Addrecipe = () => {
    const navigate = useNavigate() ;
    const [recipedata,setrecipedata] = useState({})
    const handlechange = (e)=>{
        // console.log(e.target.files[0]);
        let val = (e.target.name === "file") ? e.target.files[0] : e.target.value;
        setrecipedata(prev => ({...prev,[e.target.name]:val}))
    }
    const handlesubmit=async(e)=>{
        e.preventDefault();
        console.log(recipedata);
        await axios.post("http://localhost:5000/addrecipe",recipedata,{headers:{"Content-Type":"multipart/form-data","Authorization" :'bearer ' + localStorage.getItem("token")}})
        .then(()=>navigate("/"))
    }
  return (
    <>
    <Form className='form' onSubmit={handlesubmit}>
        <div className='form-control'>
            <label>Title</label>
            <input type='text' className='input' name="title" onChange={handlechange} required></input>
        </div>
        <div className='form-control'>
            <label>Time</label>
            <input type='text' className='Number' name="time" onChange={handlechange}  required></input>
        </div>
        <div className='form-control'>
            <label>Ingredients</label>
            <textarea type='text' className='input-textarea' name="ingredients" rows="5" onChange={handlechange}  required></textarea>
        </div>
        <div className='form-control'>
            <label>Instructions</label>
            <textarea type='text' className='input-textarea' name="instructions" rows="5" onChange={handlechange}  required></textarea>
        </div>
        <div className='form-control'>
            <label>Upload</label>
            <input type='file' className='input' name="file" onChange={handlechange}></input>
        </div>

        <button  type='submit'>Add recipe</button>
    </Form>
        </>
  )
}

export default Addrecipe
