import React, { useContext } from "react";
import { Stack, Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const NavBar = () => {

    const user = useContext(AuthContext)

    return (<Navbar bg="white" className="mb-4" style={{ height: "3.75rem" }}>
        <Container>
            <h2>
                <Link to="/" className="link-dark text-decoration-none">Chat App</Link>
            </h2>
            {user && <span className="text-primary">Logged in as charlie </span>}
            <Nav>
                <Stack direction="horizontal" gap={3}>
                {
                    user && (<>
                        <Link onClick={()=>logoutUser()} to="/login" className="link-dark text-decoration-none">
                        Logout</Link>
                        </>)
                 }
                 {!user && <>
                    <Link to="/login" className="link-dark text-decoration-none">Login </Link>
                 <Link to="/register" className="link-dark text-decoration-none">Register </Link>
                 </>}
                    
                </Stack>
            </Nav>
        </Container>
    </Navbar>);
}

export default NavBar;