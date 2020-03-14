import React, { useState, useEffect } from "react";
import axios from "axios"
import { Link } from "react-router-dom";
const Exercise = (props) => (
    <>
        <tr>
            <td>{props.exercise.username}</td>
            <td>{props.exercise.description}</td>
            <td>{props.exercise.duration}</td>
            <td>{props.exercise.date.substring(0, 10)}</td>
            <td>
                <Link to={`/edit/${props.exercise._id}`}>Edit</Link>   <a href="#" onClick={() => { props.deleteExercise(props.exercise._id) }}>delete</a>
            </td>
        </tr>
    </>
)



export default function ExercisesList() {
    const [exercises, SetExercises] = useState([]);

    useEffect(() => {
        axios.get("/exercises/")
            .then(response => {
                SetExercises(response.data);
            })
            .catch(err => console.log(`Error: ${err}`));
    }, [])

    function deleteExercise(id) {
        axios.delete(`https://mernnn.herokuapp.com/exercises/${id}`)
            .then(res => console.log(res.data));
        SetExercises(exercises.filter(el => el._id !== id))
    }
    function exerciseList() {
        return exercises.map(currentexercise => {
            return <Exercise exercise={currentexercise} deleteExercise={deleteExercise} key={currentexercise._id} />;
        })
    }
    return (
        <>
            <h4>Logged Exercices</h4>
            <table className="table">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Description</th>
                        <th>Duration</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {exerciseList()}
                </tbody>
            </table>
        </>
    )
}