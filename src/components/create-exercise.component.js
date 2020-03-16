import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useHistory } from "react-router-dom"
import axios from "axios"
export default function CreateExercise(props) {
    const [username, setUsername] = useState("");
    const [description, setDescription] = useState("");
    const [duration, setDuration] = useState(0);
    const [date] = useState(new Date());
    const [users, setUsers] = useState([]);

    let history = useHistory();
    useEffect(() => {
        axios.get("/users/")
            .then(response => {
                if (response.data.length > 0) {
                    setUsers(response.data.map(user => user.username))
                    setUsername(response.data[0].username)
                }
            })
    }, [])
    const handleUsername = (e) => {
        const username = e.target.value;
        setUsername(username);
    }
    const handleDescription = (e) => {
        const description = e.target.value;
        setDescription(description);
    }
    const handleDuration = (e) => {
        const duration = e.target.value;
        setDuration(duration);
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        const exercise = {
            username: username,
            description: description,
            duration: duration,
            date: date
        }
        console.log(exercise);
        axios.post('/exercises/add', exercise)
            .then(res => console.log(res.data))

        history.push("/")

    }
    return (
        <>
            <h4>Create New Exercise Log</h4>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlid="username">
                    <Form.Label>Username</Form.Label>
                    <select onChange={handleUsername}>
                        {users.map(function (user) {
                            return (
                                <option key={user} value={user} >
                                    {user}
                                </option>)
                        })}
                    </select>
                </Form.Group>
                <Form.Group controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" value={description} onChange={handleDescription} />
                </Form.Group>
                <Form.Group controlId="duration">
                    <Form.Label>Duration</Form.Label>
                    <Form.Control type="text" value={duration} onChange={handleDuration} />
                </Form.Group>
                <Form.Group control="datePicker">
                    <DatePicker
                        selected={date}
                    />
                </Form.Group>
                <button type="submit" className="btn-primary">Create Exercise Log</button>
            </Form>

        </>
    )
}