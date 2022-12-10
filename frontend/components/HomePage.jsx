import axios from 'axios'
import {BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom'
import NewUser from './NewUser';
import UserAccount from './UserAccount';
import { useState, useEffect} from 'react';

import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function HomePage(){

    const [user, setUser]= useState(null)
    const [quote, setQuote]= useState('')

//--------------Cookie set-up---------------------------//
    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
    
        const curr_user=async()=>{
          let myResponse=await axios.get('current_user')
          let user= myResponse.data && myResponse.data[0] && myResponse.data[0].fields
          console.log(myResponse)
          setUser(myResponse.data[0])
        }
        useEffect(()=>{
          curr_user()
        },[])
    
        return cookieValue;
      }
      const csrftoken = getCookie('csrftoken');
      axios.defaults.headers.common["X-CSRFToken"]=csrftoken
      //--------------Cookie set-up---------------------------//
    
      const quotes = {
        method: 'GET',
        url: 'https://quotes-by-api-ninjas.p.rapidapi.com/v1/quotes',
        params: {category: 'success'},
        headers: {
          'X-RapidAPI-Key': 'cb985bfd5fmsh86f285b0e1f3f59p124c93jsn9f282fa38c92',
          'X-RapidAPI-Host': 'quotes-by-api-ninjas.p.rapidapi.com'
        }
      };
      
      function funQuotes(){
      axios.request(quotes).then(function (response) {
          console.log(response.data);
          setQuote(response.data)
      }).catch(function (error) {
          console.error(error);
      });
      }

      console.log(quote[0], 'Q test')

      useEffect(()=>{
        funQuotes()
    }, [])

    return(
        <div className='home_page'>
                <div className='home_header'>
            <h1>Welcome to the Workout Tracker</h1>
        </div>
 
        {/* test api  */}
        <div className="test_btns">

        {quote && quote.map(test=> {return <h4>{test.quote}</h4>})}

         </div>
          </div>
    )
}
