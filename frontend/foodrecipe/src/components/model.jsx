import React from 'react'
import '../styles/model.css'
const Model = ({children,onclose}) => {
  return (
    <>
    <div className='backdrop' onClick={onclose} style={{display:'flex',justifyContent:'center',alignItems:'center',width:'100%',height:'100vh'}}>  </div> 
        <dialog className='model' open>
            {children}
        </dialog>

    </>
    
  )
}

export default Model
