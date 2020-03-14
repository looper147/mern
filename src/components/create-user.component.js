import React, { useState } from "react";
import axios from "axios"
import { Form } from "react-bootstrap";

export default function CreateUser() {
    const [username, setUsername] = useState("");

    const handleUsername = (e) => {
        const username = e.target.value;
        setUsername(username);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const user = {
            "username": username,

        }
        console.log(user);

        axios.post('https://mernnn.herokuapp.com/users/add', user)
            .then(res => console.log(res.data));
        setUsername('')
    }
    return (
        <>
            <h4>Create New User</h4>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" value={username} onChange={handleUsername} />
                </Form.Group>
                <button type="submit" className="btn-primary">Create User</button>
            </Form>
        </>
    )
}