import React from 'react'
import { CiSearch } from "react-icons/ci";

function Searchitem({searchname , setSearchname , searchid , setSearchid , handlesearch}) {
  return (
    <form className='search-form-css' onSubmit={(event) => handlesearch(event)}>
        <input
            type='text'
            tabIndex={2}
            placeholder='name (default : all)'
            className='search-input-css'
            value = {searchname}
            onChange={(event) => {setSearchname(event.target.value)}}
        />
        <input
            type = 'number'
            tabIndex={3}
            placeholder='id (default : all)'
            className='search-input-css'
            min="0" pattern="\d+" 
            value={searchid}
            onChange = {(event) => {setSearchid(event.target.value)}}
        />
        <button className='search-css'
            role='submit'
            onClick={(event) => handlesearch(event)}
        >
            <CiSearch 
                strokeWidth={2}
                className='addicon-css'
            />
        </button>
    </form>
  )
}

export default Searchitem
