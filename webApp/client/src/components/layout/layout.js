import { NavbarComponent } from "./navbar"
import {axiosInstance} from "../../utils/axios"
import { useEffect, useState } from 'react';
import Login from '../Login';
import { Outlet } from "react-router-dom";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from "react-bootstrap/Container";
export function Layout(props){
    let [userLoggedIn, setUserLogIn]=useState(false)
    useEffect(() => {
      axiosInstance.get("/api/getUser").then(function(user){
        if (user.status === 200) {
          console.log("Found User");
          setUserLogIn(true)
        } else {
          console.log(user.data.error);
          setUserLogIn(false)
        }
      });
    },[]);
    if(!userLoggedIn){
      return <Login/>
    }
    return (
        
        <div>
            <Row><NavbarComponent></NavbarComponent></Row>
            <Container fluid={true}>
                <Row>
                    <Col>1 of 3</Col>
                    <Col xs={6}>2 of 3 (wider)</Col>
                    <Col>3 of 3</Col>
                </Row>
                <Row>
                    <Col>1 of 3</Col>
                    <Col xs={5}>2 of 3 (wider)</Col>
                    <Col>3 of 3</Col>
                </Row>
            </Container>

            <Outlet></Outlet>
        </div>
    )
}