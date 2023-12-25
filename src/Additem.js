import React from 'react'
import { FaPlus } from "react-icons/fa6";

function Additem( {newitem , setNewitem , handleSubmit}) {
  return (
    <form className='form-css' onSubmit={(event) => handleSubmit(event)}>
        <input
            autoFocus
            type = 'text'
            className='input-css'
            placeholder='Type item here'
            value={newitem}
            onChange={(e) => setNewitem(e.target.value)}
            tabIndex={1}
            />            
      
        <button 
            type='submit'
            className='add-css'
        >
            <FaPlus 
                className='addicon-css'
            />
        </button>
    </form>
  )
}

export default Additem
