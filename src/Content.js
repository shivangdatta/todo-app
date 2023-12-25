import React from 'react'
import './index.css'
import List from './List'

export default function Content({listitem , handlecheckbox, handledeleteevent}) {
     return (
    <>
        <List
            listitem = {listitem}
            handlecheckbox = {handlecheckbox}
            handledeleteevent = {handledeleteevent}
        />
    </>
  )
}
