import React from 'react'
import Listelement from './Listelement'

export default function List({listitem , handlecheckbox , handledeleteevent}) {
  return (
    <ul>
        {listitem.map((item)=>( 
        <Listelement
            item={item}
            key = {item.id}
            handlecheckbox={handlecheckbox}
            handledeleteevent={handledeleteevent}
        />
        ))}
    </ul>
  )
}
