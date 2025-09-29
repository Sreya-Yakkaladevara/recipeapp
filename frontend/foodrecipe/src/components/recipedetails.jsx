import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { IoIosContact } from "react-icons/io";
import '../styles/recipedetails.css'

const Recipedetails = () => {
    const [details,setdetails] = useState(null)
    const {id} = useParams();
    
    useEffect(()=>{
        const recipedata = async()=>{
            await axios.get(`http://localhost:5000/${id}`).then((res)=>{
            setdetails(res.data.message)
        })
    }
    recipedata()
  },[]);
  console.log(details)
  return (
    <div className='containerbox'>
        { details ? (<>
           <div  className='inner-content'>
            <div className='user'><span className='icon'><IoIosContact /></span><p>{details.user}</p></div>
            <img src={`http://localhost:5000/image/${details.file}` } width="300px" ></img>
            <p><b className='header'>Title :</b>{details.title}</p>
            <p><b className='header'>Time :</b>{details.time}</p>
            <p><b className='header'>Instructions :</b>{details.instructions}</p>
            <p><b className='header'>Ingredients :</b>{details.ingredients}</p>
           </div>
        </>) : 
        <p> Please wait data is loading...</p>
      }
      
    </div>
  )
}

export default Recipedetails
