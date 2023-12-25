import React from 'react'

export default function Listelement({item , handlecheckbox , handledeleteevent}) {
  return (
        <li 
            className='list-css'
        >
            <input
                type='checkbox'
                checked={item.checkbox}
                onChange={() => handlecheckbox(item.id)}
            >
            </input>
            <label
                style={(item.checkbox) ? {textDecoration : 'line-through'} : {textDecoration : 'none'}}
                onDoubleClick={() => handlecheckbox(item.id)}
            >
                {item.name}
            </label>
            <button
                onClick={() => handledeleteevent(item.id)}
            > 
            delete 
            </button>
        </li>   
  )
}
