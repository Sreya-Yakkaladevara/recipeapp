import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Form, Navigate, useNavigate, useParams } from 'react-router-dom'
import '../styles/addrecipe.css'
const Editrecipe = () => {
    const navigate = useNavigate() ;
    const [recipedata,setrecipedata] = useState({});
    const {id} = useParams()
    const handlechange = (e)=>{
        // console.log(e.target.files[0]);
        let val = (e.target.name === "file") ? e.target.files[0] : e.target.value;
        setrecipedata(prev => ({...prev,[e.target.name]:val}))
    }
    useEffect(()=>{
        const getData = async () =>{
            await axios.get(`http://localhost:5000/${id}`).then((res)=>{
            let response= res.data.message
               setrecipedata({
                    title : response.title,
                    time : response.time,
                    ingredients: response.ingredients,
                    instructions : response.instructions,

                })  
             }) 
        }
      getData()   
    },[])

    const handlesubmit=async(e)=>{
        e.preventDefault();
        console.log(recipedata);
        await axios.patch(`http://localhost:5000/${id}`,recipedata,{headers:{"Content-Type":"multipart/form-data","Authorization" :'bearer ' + localStorage.getItem("token")}})
        .then(()=>navigate("/myrecipe"))
    }
  return (
    <>
    <Form className='form' onSubmit={handlesubmit}>
        <div className='form-control'>
            <label>Title</label>
            <input type='text' className='input' name="title" onChange={handlechange} value={recipedata.title} required></input>
        </div>
        <div className='form-control'>
            <label>Time</label>
            <input type='text' className='Number' name="time" onChange={handlechange} value={recipedata.time} required></input>
        </div>
        <div className='form-control'>
            <label>Ingredients</label>
            <textarea type='text' className='input-textarea' name="ingredients" rows="5" onChange={handlechange} value={recipedata.ingredients}  required></textarea>
        </div>
        <div className='form-control'>
            <label>Instructions</label>
            <textarea type='text' className='input-textarea' name="instructions" rows="5" onChange={handlechange} value={recipedata.instructions}  required></textarea>
        </div>
        <div className='form-control'>
            <label>Upload</label>
            <input type='file' className='input' name="file" onChange={handlechange}></input>
        </div>

        <button  type='submit'>Edit recipe</button>
    </Form>
        </>
  )
}

export default Editrecipe
