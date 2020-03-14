import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios"
import { useHistory } from "react-router-dom";
export default function EditExercise(props) {
    const [username, setUsername] = useState("");
    const [description, setDescription] = useState("");
    const [duration, setDuration] = useState(0);
    const [date, setDate] = useState(new Date());
    const [users, setUsers] = useState([]);

    let history = useHistory();
    useEffect(() => {
        axios.get(`https://mernnn.herokuapp.com/exercises/${props.match.params.id}`)
            .then(response => {
                setUsername(response.data.username);
                setDescription(response.data.description)
                setDuration(response.data.duration);
                setDate(new Date(response.data.date))
            })
            .catch((err) => {
                console.log(err);
            })
        axios.get("https://mernnn.herokuapp.com/users/")
            .then(response => {
                if (response.data.length > 0) {
                    setUsers(response.data.map(user => user.username))
                }
            })
    }, [props.match.params.id])
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
        axios.post(`https://mernnn.herokuapp.com/exercises/update/${props.match.params.id}`, exercise)
            .then(res => console.log(res.data))

        history.push("/")
    }
    return (
        <>
            <h4>Edit Exercise Log</h4>
            <p>username: {username}</p>
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
                <button type="submit" className="btn-primary">Edit Exercise Log</button>
            </Form>

        </>
    )
}