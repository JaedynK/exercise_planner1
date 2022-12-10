import axios from 'axios'

export default function NewUser(){
    const signUp=async()=>{
        event.preventDefault()
        let email=document.getElementById("signUpEmail").value
        let username=document.getElementById("signUpUserName").value
        let first_name=document.getElementById("signUpFirstName").value
        let last_name=document.getElementById("signUpLastName").value
        let password=document.getElementById("signUpPassword").value
        console.log(email, password)
        let myResponse=await axios.post('signUp/',{
            'username': username,
            'first_name': first_name,
            'last_name': last_name,
            'email':email,
            'password':password
        })
        // if(myResponse.data['signup']==true){
        //     window.location.href="/#/signIn"
        // }
        // else{
        //     alert("incorrect input")
        //     window.location.reload()
        // }
    }

    return(
        <div className='sign_up_page'>
        <form onSubmit={signUp}>
        <input id='signUpUserName' placeholder='username' />
        <input id='signUpFirstName' placeholder='First Name' />
        <input id='signUpLastName' placeholder='Last Name' />
        <input id='signUpEmail' placeholder='email' />
        <input id='signUpPassword' placeholder='password' />
        <button onClick={signUp}>Sign Up</button>
        </form>
        </div>
    )
}
