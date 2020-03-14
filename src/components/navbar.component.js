import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import { Navbar, Nav, NavItem } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export default function NavBar() {
    return (

        <>
            <div className="container">
                <Navbar expand="lg" bg="dark" variant="dark" sticky="top">
                    <Nav className="mr-auto">
                        <Navbar.Brand>ExcerTracker</Navbar.Brand>
                        <NavItem>
                            <NavLink exact to="/" className="nav-link">Exercises</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink to="/create" className="nav-link">Create Exercise Log</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink to="/user" className="nav-link">Create User</NavLink>
                        </NavItem>
                    </Nav>
                </Navbar>
            </div>

        </>
    );
}
