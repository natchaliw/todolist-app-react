import {useState} from 'react';
import './App.css';
import { v4 as uuidv4 } from 'uuid';
import List from './component/List';
import ALert from './component/ALert';

function App() {

  const [input,setInput] = useState("")
  const [list,setList] = useState([])

  const [alert,setAlert] = useState({show:false,message:"",type:""})
  const [checkEditItem,setCheckEditItem] = useState(false)
  const [editId,setEditId] = useState(null)

  const submitData=(e)=> {
    e.preventDefault()
    if(!input) {
      setAlert({show:true,message:"Please add Your new list",type:"error"})
    } else if(checkEditItem && input){
        const resultEdit = list.map((item)=>{
          if(item.id === editId) {
            return {...item,title:input, status: false}
          }
          return item
        })
        setList(resultEdit)
        setInput("")
        setCheckEditItem(false)
        setEditId(null)
        setAlert({show:true,message:"Edit Completed",type:"success"})
    } else {
        const newItem = {
          id: uuidv4(),
          title: input
        }
        setList([...list,newItem])
        setInput("")
        setAlert({show:true,message:"It have been done already",type:"success"})
      }
  }
  const delItem =(id)=> {
    const result = list.filter((item)=>item.id !== id)
    setList(result)
    setAlert({show:true,message:"Delete Complete",type:"error"})
  }

  const editItem =(id)=> {
    setCheckEditItem(true)
    setEditId(id)
    const searchItem = list.find((item)=>item.id === id)
    setInput(searchItem.title)
  }

  const completeItem =(id)=> {
    const complete = list.map((item)=>{
        if(item.id === id) {
          return {...item, status : !item.status}
        }
        return item;
      })
    setList(complete)
  }

  return (
    <>
    <div className="app">
      <div className="container">
        <div className="title-header">
          <h1>To Do <span>List !</span></h1>
        </div>
        {alert.show && <ALert {...alert} setAlert={setAlert} list={list}/>}
        <form 
          className="form-control"
          onSubmit={submitData}>
            <input 
              type="text"
              className="text-input"
              placeholder="Enter Your tasks"
              onChange={(e)=>{setInput(e.target.value)}} 
              value={input}/>
            <button 
              type="submit"
              className="submit-btn"
              >{checkEditItem ? "Edit" : "Send"}
            </button>
        </form>
        <div className="list-container">
          {list.map((data,index)=> {
            return <List key={index} {...data} delItem={delItem} editItem={editItem} completeItem={completeItem}/>
          })}
        </div>
      </div>
    </div>
    <footer className="footer">
      <p>Copyright &copy; 2024 by Natcha | All Rights Reserved</p>
    </footer>
    </>
  );
}

export default App;
