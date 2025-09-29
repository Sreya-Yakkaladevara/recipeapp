import React, { useState } from 'react'
import axios from 'axios';
import { Form, Navigate, useNavigate } from 'react-router-dom';
import '../styles/form.css'
const Formdata = ({setopen}) => {
  const [email,setemail] = useState("");
  const [password,setpassword] = useState("");
  const [islogin , setlogin] = useState(false);
  const [error , seterror] = useState("");

  const handlesubmit = async (e) =>{
      e.preventDefault();
      let endpoint = (islogin)? "register":"login";
      await axios.post(`http://localhost:5000/user/${endpoint}`,{email,password})
      .then((res)=>{
        localStorage.setItem("token",res.data.token);
        localStorage.setItem("userdata",JSON.stringify(res.data.message));
        setopen()
      }).catch((error)=>seterror(error.response?.data.error));
  }
  return (
    <>
    <Form className='form' onSubmit={handlesubmit}>
        <div className='form-control'>
            <label>Email</label>
            <input type='email' className='input' value={email} onChange={(e)=>setemail(e.target.value)} required></input>
        </div>
        <div className='form-control'>
            <label>password</label>
            <input type='password' className='input' value={password} onChange={(e)=>setpassword(e.target.value)}  required></input>
        </div>
        <button className='btn' type='submit'>{(islogin)?"signup":"Login"}</button>
        {(error != "") && <h6 className='error'>{error}</h6>}
        <p onClick={()=>setlogin((prev)=>!prev)}>{(islogin) ? "already have an account" : "create a new account" }</p>
    </Form>
    </>
  )
}

export default Formdata
