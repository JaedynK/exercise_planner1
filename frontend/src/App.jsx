import { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

import MyNavbar from '../components/Navbar';

function App() {
  
  const [show, setShow] = useState(false);
  const [user, setUser]= useState(null)

//--------------Cookie set-up---------------------------//
  function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }

    const curr_user=async()=>{
      let myResponse=await axios.get('current_user')
      let user1= myResponse.data 
      console.log(user1)
      setUser(user1)
    }

    useEffect(()=>{
      curr_user()
    },[])

    return cookieValue;
  }
  const csrftoken = getCookie('csrftoken');
  axios.defaults.headers.common["X-CSRFToken"]=csrftoken
  //--------------Cookie set-up---------------------------//
  // console.log(user)

  
  
  function deleteUser(id){
    axios.delete(`current_user/${id}/` )
    .then( response => {
      console.log(response.data)
    }).then(
      console.log('worked')
    )
  }
 
  function getAllExercise(){
    axios.get('exercise/').then(response=>{
      let data = response.data
      console.log(data)
    })
  }

  useEffect(()=>{
      getAllExercise()
  }, [])
  
  return (
   
    <div className="App"  >
      
      
      <MyNavbar user={user && user.username}/>

    </div>
  )
}

export default App
