import { useState, useEffect } from "react";
import Select from 'react-select'
import axios from "axios";

export default function NewUser(){

    const [selectMuscile, setSelectMuscile]= useState('')
    const [workout, setWorkOut]= useState('')
    const musciles = [
        {label: 'abdominals', value:'abdominals' },
        {label: 'abductors', value:'abductors' },
        {label:'adductors', value: 'adductors' },
        {label:'biceps', value: 'biceps'},
        {label:'calves', value: 'calves'},
        {label:'chest', value: 'chest'},
        {label:'forearms', value: 'forearms'},
        {label:'glutes', value: 'glutes'},
        {label:'hamstrings', value: 'hamstrings'},
        {label:'lats', value: 'lats'},
        {label:'lowerback middleback', value: 'lowerback middleback'},
        {label:'neck', value: 'neck'},
        {label:'quadriceps', value: 'quadriceps'},
        {label:'traps', value:'traps'},
        {label:'triceps', value: 'triceps'}
      ]

    const muscleGroupsAPI = {
        method: 'GET',
        url: 'https://exercises-by-api-ninjas.p.rapidapi.com/v1/exercises',
        params: {muscle: selectMuscile,},
        headers: {
          'X-RapidAPI-Key': 'cb985bfd5fmsh86f285b0e1f3f59p124c93jsn9f282fa38c92',
          'X-RapidAPI-Host': 'exercises-by-api-ninjas.p.rapidapi.com'
        }
      };
      
      function muscleGroups(){
        axios.request(muscleGroupsAPI).then(function (response) {
          let exerciseApiData = response.data
          console.log(response.data);
          setWorkOut(exerciseApiData)
        }).catch(function (error) {
          console.error(error);
        });
      }
      

    const addExercise=async()=>{
        event.preventDefault()
        let exercise_title = document.getElementById("exerciseName").value
        let muscile_group =document.getElementById("muscileGroup").value || selectMuscile
        let equipment = document.getElementById("equipment").value
        let workout_type = document.getElementById("workoutType").value
        let user_exercise = user.username
        console.log(muscile_group, workout_type)
        let myResponse=await axios.post('exercise/',{
            'exercise_title': exercise_title,
            'muscile_group': muscile_group,
            'equipment': equipment,
            'workout_type': workout_type,
            'user_exercise': user_exercise,
        })
        // if(myResponse.data['signup']==true){
        //     window.location.href="/#/signIn"
        // }
        // else{
        //     alert("incorrect input")
        //     window.location.reload()
        // }
    }

    useEffect(()=>{
        muscleGroups()
    }, [])



return(
<div className="container">

        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6"> 
             <Select id='muscileGroup' options={musciles} onChange={(e)=> setSelectMuscile(e.value)} />
             <button onClick={() => {muscleGroups()}}>
            Update List
            </button>
          </div>
          <div className="col-md-4"></div>
        </div>

        {workout && workout.map(exercise=> {return <p>{exercise.name}</p>})}
        <div className='Manual Sign-Up'>
            <h5>Manaul Exercise Input</h5>
            <form onSubmit={addExercise}>
                <input id='exerciseName' placeholder='Exercise Name' />
                    <input id='muscileGroup' placeholder={selectMuscile || `Muscile Group`} />
                <input id='equipment' placeholder='Equipment' />
                <input id='workoutType' placeholder='Workout Type' />
                <button onClick={addExercise}>Save Exercise</button>
            </form>
        </div>
</div>
)
}