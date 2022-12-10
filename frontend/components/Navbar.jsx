import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
// import { Router } from 'react-router-dom';
import NewUser from './NewUser';
import {BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom'

import HomePage from './HomePage';
import UserAccount from './UserAccount';
import LogIn from './LogIn'
import AddExercises from './AddExercises'


export default function MyNavbar({user}) {

    console.log(user)

    const signOut=async()=>{
        let myResponse=await axios.post('signOut/')
        if (myResponse.data["signout"]==true){
          window.location.reload()
        }
      }
  return (
    <Router>
    <Navbar bg="dark" variant='dark' expand="lg" >
      <Container>
        
        <Navbar.Brand href={'/'}>Home</Navbar.Brand>
        <Nav.Item>
            {user || <Link className='link1' to='/signUp'>New Account</Link>}
        </Nav.Item>
        <Nav.Item>
           {<Link classNam='link2'to='/userAccount'>Workouts</Link>}
        </Nav.Item>
        <Nav.Item>
           {<Link classNam='link2'to='/addExercise'>Add Exercise</Link>}
        </Nav.Item>
        {/* <Navbar.Collapse className="justify-content-end"> */}          
          <Navbar>
        {user &&  <a href='#'>Signed in as: {user}<button className='sign_out_btn' onClick={signOut}>Sign Out</button></a>}
        </Navbar>
        <Nav.Item>
           { user || <Link classNam='link2'to='/signIn'>Log In</Link>}
        </Nav.Item>
        {/* </Navbar.Collapse> */}
           
      </Container>
    </Navbar>
    <Routes>
            <Route path='' element={<HomePage  user={user}/>}></Route>
            <Route path='/signUp' element={<NewUser />}></Route>
            <Route path='/signIn' element={<LogIn />}></Route>
            <Route path='/userAccount' element={<UserAccount />}></Route>
            <Route path='/addExercise' element={<AddExercises />}></Route>
        </Routes>
    </Router>
  );
}