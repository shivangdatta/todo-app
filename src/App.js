// make a todo list
import Header from "./Header";
import Content from "./Content";
import { useEffect, useState } from "react";
import Additem from "./Additem";
import Searchitem from "./Searchitem";
import apireq from "./Apireq";

function App() {
  const API_URL = "http://localhost:3500/items" 
  const [listitem , setListitem] = useState([]);
  const [newitem , setNewitem] = useState("");
  const [searchname , setSearchname] = useState('');
  const [searchid , setSearchid] = useState('');
  const [fetchError , setFetcherror] = useState('');    
  const [loadingtime , setloadingtime] = useState(true)

  useEffect(()=>{

    const fetchItems = async () =>{
      try{
        const response = await fetch(API_URL);
        const items = await response.json();
        if(!response.ok)throw Error("couldnt retreive data from json");
        setlist(items);        
        setFetcherror('');
      } catch (err){
        setFetcherror(err.message)
      }
      finally{
        setloadingtime(false)
      }
    }
    // setTimeout(() => fetchItems(), 2000);
    fetchItems();
  },[])

  
  function setlist(arg){
    setListitem(arg);
    localStorage.setItem('changeditems',JSON.stringify(arg));
  }


  const handlecheckbox = async (id) => {
    const prevlist = listitem;
    const itemscheck = listitem.map((item) =>{
        return item.id === id ? {...item , checkbox : !item.checkbox} : item;
    })
    setlist(itemscheck);
    
    let dbitem = prevlist.filter((item)=>id===item.id);
    const optionsOBJ = {
      method : 'PATCH',
      headers : {
        'content-type' : 'application/json'
      },
      body : JSON.stringify({checkbox : !dbitem[0].checkbox})
    }
    const requrl = `${API_URL}/${id}`;
    let result = await apireq(requrl , optionsOBJ);
    if(result) setFetcherror(result);
  }
  
  let handledeleteevent = async (id) => {
    const itemsleft = listitem.filter((item)=>{
      return item.id !== id;
    })
    setlist(itemsleft);

    const optionsOBJ = { method : 'DELETE'}
    const requrl = `${API_URL}/${id}`;
    let result = await apireq(requrl , optionsOBJ);
    if(result) setFetcherror(result);
  }



  let addItem = async (newitem) => {
    const newid = listitem.length === 0 ? 1 : listitem[listitem.length-1].id + 1;
    const newlistitem = {id : newid, name : newitem ,checkbox : false};
    const newlist = [...listitem , newlistitem];
    setlist(newlist);
    setNewitem('');
    let optionsOBJ = {
      method : 'POST',
      headers : {
        'Content-type' : 'application/json' 
      },
      body : JSON.stringify(newlistitem)
    }
    const result = await apireq(API_URL , optionsOBJ );
    if(result) setFetcherror(result);
  }

  function handleSubmit(event){
    event.preventDefault();
    console.log(event)
    addItem(newitem);
    setNewitem('');
  }

  function handlesearch(event){
      event.preventDefault();
      console.log('do nothing');
      console.log(searchid);
      console.log(searchname);
  }

  return (
    <>
      <Header/>
      <Searchitem
        searchname = {searchname}
        setSearchname = {setSearchname}
        searchid = {searchid}
        setSearchid = {setSearchid}
        handlesearch = {handlesearch}
      />
      <Additem 
        handleSubmit = {handleSubmit}
        setNewitem = {setNewitem}
        newitem = {newitem}
      />
      <main>
        {fetchError && <p style = {{color : 'red' , textAlign : 'center' }}> `error   {fetchError}` </p> }
        {loadingtime &&  <p style = {{color : 'green' , textAlign : 'center' }}> Loading </p> }
        <Content
          handlecheckbox = {handlecheckbox}
          handledeleteevent = {handledeleteevent}
          listitem={(searchid === '' && searchname === '') ? listitem : (
            searchname !== '' ?
              listitem.filter(item => item.name.toLowerCase().includes(searchname.toLowerCase())) 
            : listitem)
          }
          setListitem = {setListitem}
        />
      </main>
    </>
  );
}

export default App;
