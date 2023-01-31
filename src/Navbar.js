import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbarr from 'react-bootstrap/Navbar';
import { useContext } from "react";
import Button from 'react-bootstrap/Button';
import myCtx from './store/authCtx';


function Navbar() {
    const authCtx = useContext(myCtx);
    return (
        <>
            <Navbarr bg="dark" variant="dark">
                <Container>
                    <Navbarr.Brand href="#home">Navbar</Navbarr.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#features">Features</Nav.Link>
                        <Nav.Link href="#pricing">Pricing</Nav.Link>
                    </Nav>
                </Container>
            </Navbarr>
        </>

    )
}

export default Navbar