import React from 'react'
import './List.css'
import { FaCheckCircle, FaRegEdit, FaTrashAlt } from "react-icons/fa";

function List({id,title,status,delItem,editItem,completeItem}) {
  return (
    <div className="list-item" id={status ? 'item-complete' : ''}>
      <p className="item">{title}</p>
      <div className="button-control">
        <button onClick={()=>completeItem(id)}
            className="complete-button">
            <FaCheckCircle size='1.5rem' color='#569a54'/>
        </button>
        <button onClick={()=>editItem(id)}
            className="edit-button">
            <FaRegEdit size='1.5rem' color='#ffa200'/>
        </button>
        <button onClick={()=>delItem(id)}
            className="del-button">
            <FaTrashAlt size='1.5rem' color='#e14b4b' />
        </button>
      </div>
    </div>
  )
}

export default List